import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const roots = ["scripts", "src", "test"];
const sourceFiles = [];

function collectJavaScript(candidate) {
  for (const entry of fs.readdirSync(candidate, { withFileTypes: true })) {
    const absolute = path.join(candidate, entry.name);

    if (entry.isDirectory()) {
      collectJavaScript(absolute);
    } else if (/\.(?:js|mjs|cjs)$/.test(entry.name)) {
      sourceFiles.push(absolute);
    }
  }
}

roots.forEach(collectJavaScript);
sourceFiles.sort();

for (const file of sourceFiles) {
  const result = spawnSync(process.execPath, ["--check", file], {
    encoding: "utf8",
    shell: false,
    windowsHide: true,
  });

  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
}

process.stdout.write(`syntax check passed (${sourceFiles.length} files)\n`);
