#!/usr/bin/env node

import { readdirSync, writeFileSync, readFileSync, mkdirSync } from "fs";
import { Command } from "commander";

interface File {
  name: string;
  path: string;
  content: string;
}

const program = new Command();

const readDirRecursive = (path: string) => {
  const files: File[] = [];

  for (const object of readdirSync(path, { withFileTypes: true })) {
    if (object.isDirectory()) {
      if (["node_modules", ".git"].includes(object.name)) continue;
      files.push(...readDirRecursive(`${object.parentPath}/${object.name}`));
    } else
      files.push({
        name: object.name,
        path: object.parentPath,
        content: readFileSync(`${object.parentPath}/${object.name}`).toString("base64"),
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
    writeFileSync(`${file.path}/${file.name}`, file.content, "utf-8");
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
