import { writeFileSync } from "fs";
import { basename, resolve } from "path";

import { getProjectFiles } from "../core/getProjectFiles";

/**
 * Clone (snapshot) a local project into a JSON file.
 *
 * @param rootPath - Path of the project directory to snapshot
 * @param ignoreBinaries - If true, skips storing binary file contents (keeps metadata only)
 * @param ignoreAll - If true, skips storing all file contents (keeps only structure + metadata)
 */
export const cloneProject = (
  rootPath: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean
) => {
  // Resolve the absolute path and extract just the project folder name
  const projectDirectoryName = basename(resolve(rootPath));

  console.log(`Scanning project: ${projectDirectoryName}`);

  // Recursively collect all files and metadata from the project directory
  const files = getProjectFiles(rootPath, ignoreBinaries, ignoreAll);

  console.log(`Scan complete. Total files: ${files?.length}`);

  // Save the snapshot to a JSON file named after the project
  writeFileSync(
    `${projectDirectoryName}.snapcube.json`,
    JSON.stringify(files, null, 4) // pretty-print with 4-space indentation
  );
  console.log("Snapshot saved");
};
