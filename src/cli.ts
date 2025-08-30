#!/usr/bin/env node

import { Command } from "commander";

import {
  cloneGithubRepo,
  cloneGitlabRepo,
  cloneProject,
  createProject,
} from "./commands";
import { ServiceOptions } from "./types";

const program = new Command();

program
  .name("snapcube")
  .description("Clone or recreate project structure")
  .version("1.4.2");

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
  .option("--structure-only", "Just return the filenames with full path")
  .action((rootPath, options: ServiceOptions) => {
    try {
      cloneProject(rootPath, options);
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
  .argument("<scm:username/repo@branch>", "Repo to clone")
  .description("Save structure and data of the repo to JSON")
  .option("--ignore-binaries", "Ignore files like images, pdfs, videos etc")
  .option("--ignore-all", "Ignore all files")
  .option("--structure-only", "Just return the filenames with full path")
  .option("--token <token>", "Personal access token")
  .action(async (repository: string, options: ServiceOptions) => {
    try {
      const [repoPart, branch] = repository.split("@");
      const [scm, repo] = repoPart?.split(":")!;

      switch (scm) {
        case "github":
          await cloneGithubRepo(repo!, branch!, options);
          break;
        case "gitlab":
          await cloneGitlabRepo(repo!, branch!, options);
          break;
        default:
          break;
      }
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
