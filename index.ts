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

const readProject = (rootPath: string) => {
  console.log(`📂 Scanning project: ${rootPath}`);

  const files: File[] = [];

  const scanDir = (path: string) => {
    for (const object of readdirSync(path, { withFileTypes: true })) {
      const fullPath = join(object.parentPath, object.name);

      if (object.isDirectory()) {
        if (IGNORE_DIRS.includes(object.name)) {
          console.log(`🚫 Skipping directory: ${fullPath}`);
          continue;
        }

        scanDir(fullPath);
      } else {
        const isBinary = isBinaryFile(object.name);

        console.log(
          `📄 Added file: ${fullPath} ${isBinary ? "(binary) 🖼 " : "(text) 📝"}`
        );

        files.push({
          name: object.name,
          path: object.parentPath,
          content: readFileSync(fullPath).toString(
            isBinary ? "base64" : "utf-8"
          ),
          isBinary,
        });
      }
    }
  };

  scanDir(rootPath);
  console.log(`✅ Scan complete. Total files: ${files.length}`);
  return files;
};

const saveProjectSnapshot = (path: string) => {
  writeFileSync("snapcube.json", JSON.stringify(readProject(path), null, 1));
  console.log("💾 Snapshot saved");
};

const createProject = (filePath: string) => {
  console.log(`📂 Restoring project from: ${filePath}`);

  const data = JSON.parse(readFileSync(filePath, "utf-8")) as File[];

  data.forEach((file) => {
    mkdirSync(file.path, { recursive: true });

    const fullPath = join(file.path, file.name);

    if (file.isBinary) {
      console.log(`🖼 Restoring binary file: ${fullPath}`);
      writeFileSync(fullPath, Buffer.from(file.content, "base64"));
    } else {
      console.log(`✏️ Restoring text file: ${join(file.path, file.name)}`);
      writeFileSync(fullPath, file.content, "utf-8");
    }
  });

  console.log(`✅ Project restored successfully.`);
};

program
  .name("snapcube")
  .description("Clone or recreate project structure")
  .version("1.0.0");

program
  .command("clone")
  .argument("<dir>", "Directory to clone")
  .description("Save structure of the project to JSON")
  .action(saveProjectSnapshot);

program
  .command("create")
  .argument("<json-file>", "JSON file to create project from")
  .description("Create project files from a saved JSON")
  .action(createProject);

program.parse();
