#!/usr/bin/env node

import { Command } from "commander";

import { cloneProject, createProject } from "./commands";

const program = new Command();

program
  .name("snapcube")
  .description("Clone or recreate project structure")
  .version("1.0.0");

program
  .command("clone")
  .argument("<dir>", "Directory to clone")
  .description("Save structure of the project to JSON")
  .option("--ignore-binaries", "Ignore files like images, pdfs, videos etc")
  .option("--ignore-all", "Ignore all files")
  .action((rootPath, options) =>
    cloneProject(rootPath, options.ignoreBinaries, options.ignoreAll)
  );

program
  .command("create")
  .argument("<json-file>", "JSON file to create project from")
  .description("Create project files from a saved JSON")
  .action(createProject);

program.parse();
