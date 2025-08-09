#!/usr/bin/env node

import { readdirSync, writeFileSync, readFileSync, mkdirSync } from "fs";
import { extname, join } from "path";
import { Command } from "commander";

interface File {
  name: string;
  path: string;
  content: string;
  isBinary: boolean;
}

const IGNORE_DIRS = ["node_modules", ".git", ".next", "out", "dist"];
const BINARY_EXTS = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

const isBinaryFile = (name: string) =>
  BINARY_EXTS.includes(extname(name.toLowerCase()));

const program = new Command();

const readDirRecursive = (path: string) => {
  const files: File[] = [];

  for (const object of readdirSync(path, { withFileTypes: true })) {
    const isBinary = isBinaryFile(object.name);

    const fullPath = join(object.parentPath, object.name);

    if (object.isDirectory()) {
      if (IGNORE_DIRS.includes(object.name)) continue;
      files.push(...readDirRecursive(fullPath));
    } else
      files.push({
        name: object.name,
        path: object.parentPath,
        content: readFileSync(fullPath).toString(isBinary ? "base64" : "utf-8"),
        isBinary,
      });
  }

  return files;
};

const readProject = (path: string) => {
  const project = readDirRecursive(path);
  writeFileSync("snapcube.json", JSON.stringify(project, null, 1));
};

const createProject = (filePath: string) => {
  const data = JSON.parse(readFileSync(filePath, "utf-8")) as File[];

  data.forEach((file) => {
    mkdirSync(file.path, { recursive: true });
    if (file.isBinary)
      writeFileSync(
        join(file.path, file.name),
        Buffer.from(file.content, "base64")
      );
    else writeFileSync(join(file.path, file.name), file.content, "utf-8");
  });
};

program
  .name("snapcube")
  .description("Clone or recreate project structure")
  .version("1.0.0");

program
  .command("clone")
  .argument("<dir>", "Directory to clone")
  .description("Save structure of the project to JSON")
  .action(readProject);

program
  .command("create")
  .argument("<json-file>", "JSON file to create project from")
  .description("Create project files from a saved JSON")
  .action(createProject);

program.parse();
