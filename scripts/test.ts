import { Glob, $ } from "bun";
import { rm } from "node:fs/promises";
import { mergeCoverageReportFiles } from "lcov-result-merger";
import parse from "lcov-parse";
import path from "node:path";
import { Table } from "console-table-printer";

const domGlob = new Glob("**/*.dom.test.{js,jsx,ts,tsx,mjs,cjs,mts,cts}");
const allGlob = new Glob("**/*.test.{js,jsx,ts,tsx,mjs,cjs,mts,cts}");

const testedFiles: string[] = [];

function getMissingLineRanges(lines: parse.LcovLine[]) {
  const ranges: Array<[number, number]> = [];

  for (const { line, hit } of lines) {
    if (hit !== 0) {
      continue;
    }

    const lastRange = ranges.at(-1);

    if (lastRange && line === lastRange[1] + 1) {
      lastRange[1] = line;
    } else {
      ranges.push([line, line]);
    }
  }

  return ranges
    .map(([startLine, endLine]) =>
      startLine === endLine ? `${startLine}` : `${startLine}-${endLine}`,
    )
    .join(", ");
}

async function runDomTests() {
  const files = domGlob.scan(".");

  console.log("Running DOM tests...");

  for await (const file of files) {
    if (file.includes("/node_modules/")) continue;

    console.log(file);
    testedFiles.push(file);
    await $`bun test --preload ./packages/frontend/happy-dom-env.ts --coverage ${file}`;
  }
}

async function runServerTests() {
  const files = allGlob.scan(".");

  for await (const file of files) {
    if (file.includes("/node_modules/")) continue;

    console.log(file);
    if (!testedFiles.includes(file)) {
      await $`bun test --coverage ${file}`;
    }
  }
}

async function combineCoverageReports() {
  const coverageReports = [];

  const coverageFiles = new Glob("*").scan({ cwd: "coverage", dot: true });

  for await (const file of coverageFiles) {
    coverageReports.push(`coverage/${file}`);
  }

  const result = await mergeCoverageReportFiles(coverageReports, {
    pattern: "coverage/*",
  });

  parse(result, (err, data) => {
    if (err || !data) {
      console.error("Error parsing coverage report:", err);
      return;
    }

    const table = new Table();

    let totalLines = 0;
    let totalCoveredLines = 0;

    for (const fileCoverage of data) {
      const filePath = fileCoverage.file;
      const totalFileLines = fileCoverage.lines.found;
      const coveredLines = fileCoverage.lines.hit;
      const coveragePercentage = (coveredLines / totalFileLines) * 100;

      totalLines += totalFileLines;
      totalCoveredLines += coveredLines;

      table.addRow(
        {
          file: path.basename(filePath),
          totalLines: totalFileLines,
          coveredLines,
          coveragePercentage: coveragePercentage.toFixed(2) + "%",
          missingLines: getMissingLineRanges(fileCoverage.lines.details),
        },
        {
          color: coveragePercentage < 80 ? "red" : "green",
        },
      );
    }

    table.printTable();

    console.log(
      `Total coverage percentage: ${((totalCoveredLines / totalLines) * 100).toFixed(2)}% (${totalCoveredLines}/${totalLines})`,
    );
  });
}

await rm("coverage", { recursive: true, force: true });
await runDomTests();
await runServerTests();
await combineCoverageReports();
