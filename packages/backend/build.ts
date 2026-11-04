import { rm } from "node:fs/promises";
import path from "node:path";

export async function build() {
  const outdir = path.join(process.cwd(), "dist");
  await rm(outdir, { recursive: true, force: true });

  const binary = await Bun.build({
    entrypoints: ["src/index.ts"],
    compile: {
      outfile: path.join(outdir, "backend"),
    },
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
    throw new Error("Failed to compile the backend server binary");
  }

  console.log("Built binary executable at:", path.join(outdir, "backend"));
}

await build();
