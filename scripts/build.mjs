import fs from "node:fs";
import path from "node:path";

const output = path.resolve("dist");
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
fs.cpSync(path.resolve("public"), output, { recursive: true });
fs.cpSync(path.resolve("src"), path.join(output, "src"), { recursive: true });

if (!fs.existsSync(path.join(output, "index.html"))) {
  throw new Error("production build did not create index.html");
}

process.stdout.write(`production build created ${output}\n`);
