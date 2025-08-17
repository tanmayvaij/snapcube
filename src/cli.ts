#!/usr/bin/env node

import { Command } from "commander";

import { cloneGithubRepo, cloneProject, createProject } from "./commands";

const program = new Command();

program
  .name("snapcube")
  .description("Clone or recreate project structure")
  .version("1.3.1");

/**
 * -------------------------
 * Local Project Cloning
 * -------------------------
 */
program
  .command("clone")
  .argument("<dir>", "Directory to clone")
  .description("Save structure of the project to JSON")
  .option("--ignore-binaries", "Ignore files like images, pdfs, videos etc")
  .option("--ignore-all", "Ignore all files")
  .action((rootPath, options) => {
    try {
      cloneProject(rootPath, options.ignoreBinaries, options.ignoreAll);
    } catch (err: any) {
      console.error(err.message);
      process.exit(1);
    }
  });

/**
 * -------------------------
 * GitHub Repo Cloning
 * -------------------------
 */
program
  .command("clone-repo")
  .argument("<username/repo>", "Repo to clone")
  .description("Save structure and data of the repo to JSON")
  .option("--ignore-binaries", "Ignore files like images, pdfs, videos etc")
  .option("--ignore-all", "Ignore all files")
  .option("--token <github_token>", "GitHub personal access token")
  .action(async (repository, options) => {
    try {
      await cloneGithubRepo(
        repository,
        options.ignoreBinaries,
        options.ignoreAll,
        options.token
      );
    } catch (err: any) {
      console.error(err.message);
      process.exit(1);
    }
  });


/**
 * -------------------------
 * Project Creation
 * -------------------------
 */  
program
  .command("create")
  .argument("<json-file>", "JSON file to create project from")
  .description("Create project files from a saved JSON")
  .action((filePath) => {
    try {
      createProject(filePath);
    } catch (err: any) {
      console.error(err.message);
      process.exit(1);
    }
  });

// Parse CLI arguments
program.parse();
