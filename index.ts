#!/usr/bin/env node

import { readdirSync, writeFileSync, readFileSync, mkdirSync } from "fs";
import { Command } from "commander";

interface File {
  name: string;
  path: string;
  content: string;
}

const program = new Command();

const readProject = (path: string) => {
  const project = readdirSync(path, {
    encoding: "utf-8",
    recursive: true,
    withFileTypes: true,
  })
    .filter((obj) => obj.isFile() && !obj.parentPath.startsWith("node_modules"))
    .map(({ name, parentPath }) => ({
      name,
      path: parentPath,
      content: readFileSync(`${parentPath}/${name}`, "utf-8"),
    }));

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
