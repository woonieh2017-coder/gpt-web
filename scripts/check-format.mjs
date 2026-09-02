import fs from "node:fs";
import path from "node:path";

const roots = ["public", "scripts", "src", "test"];
const individualFiles = [".gitignore", "AGENTS.md", "package.json", "README.md"];
const failures = [];

function collectFiles(candidate) {
  if (!fs.existsSync(candidate)) {
    return [];
  }

  const stat = fs.statSync(candidate);
  if (stat.isFile()) {
    return [candidate];
  }

  return fs.readdirSync(candidate, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => collectFiles(path.join(candidate, entry.name)));
}

for (const file of [...roots.flatMap(collectFiles), ...individualFiles]) {
  const content = fs.readFileSync(file, "utf8");

  if (content.includes("\r")) {
    failures.push(`${file}: use LF line endings`);
  }

  if (!content.endsWith("\n")) {
    failures.push(`${file}: add a final newline`);
  }

  content.split("\n").forEach((line, index) => {
    if (/[\t ]+$/.test(line)) {
      failures.push(`${file}:${index + 1}: remove trailing whitespace`);
    }
  });
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write("format check passed\n");
}
