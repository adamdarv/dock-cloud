import tailwind from "bun-plugin-tailwind";
import { rm } from "node:fs/promises";
import path from "node:path";
import { minify } from "html-minifier-terser";
import { routeModules } from "./src/pages";

export async function build() {
  const outdir = path.join(process.cwd(), "dist");
  await rm(outdir, { recursive: true, force: true });

  const entrypoints = [...new Bun.Glob("src/**/*.html").scanSync()];

  const result = await Bun.build({
    entrypoints,
    outdir: path.join(outdir, "static"),
    plugins: [tailwind],
    minify: true,
    treeShaking: true,
    target: "browser",
    sourcemap: "none",
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    // Inline BUN_PUBLIC_* vars (e.g. BUN_PUBLIC_BACKEND_URL) into the client bundle.
    env: "BUN_PUBLIC_*",
    splitting: true,
    metafile: true,
  });

  if (!result.metafile) {
    throw new Error("Metafile not generated?");
  }

  const outputs = Object.entries(result.metafile.outputs);

  let entryRoute: string | undefined = undefined;

  for (const output of outputs) {
    if (
      output[1].entryPoint === "src/index.html" &&
      output[0].endsWith(".js")
    ) {
      entryRoute = output[0];
      break;
    }
  }

  if (!entryRoute) {
    throw new Error("No entry route found for src/index.html");
  }

  const routes = Object.fromEntries(
    Object.entries(routeModules).map(([route, sourceModule]) => {
      const [outputPath] =
        outputs.find(([, output]) =>
          Object.keys(output.inputs).some((input) =>
            input.endsWith(sourceModule),
          ),
        ) ?? [];

      if (!outputPath) {
        throw new Error(
          `No emitted chunk found for route module: ${sourceModule}`,
        );
      }

      const absoluteOutputPath = path.resolve(outdir, outputPath);
      return [route, `/${path.relative(outdir, absoluteOutputPath)}`];
    }),
  );

  await Bun.write(
    path.join(outdir, "route-manifest.json"),
    JSON.stringify({ routes, entryRoute }, null, 2),
  );

  const htmlFile = Bun.file("./dist/static/index.html");
  const htmlContent = await htmlFile.text();

  const compressedHtml = await minify(htmlContent, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  });

  await Bun.write("./dist/static/index.html", compressedHtml);

  for (const output of result.outputs) {
    console.log(
      ` ${path.relative(process.cwd(), output.path)}  ${(output.size / 1024).toFixed(1)} KB`,
    );
  }

  const binary = await Bun.build({
    entrypoints: ["src/index.ts"],
    compile: {
      outfile: path.join(outdir, "frontend"),
    },
    plugins: [tailwind],
    minify: true,
    sourcemap: "none",
    target: "bun",
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    bytecode: true,
  });

  if (!binary.success) {
    console.error(binary.logs);
    throw new Error("Failed to compile the frontend server binary");
  }

  console.log("Built binary executable at:", path.join(outdir, "frontend"));
}

await build();
