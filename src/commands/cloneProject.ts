import { writeFileSync } from "fs";
import { basename, resolve } from "path";

import { getProjectFiles } from "../core/getProjectFiles";

/**
 * Clone (snapshot) a local project into a JSON file.
 *
 * @param rootPath - Path of the project directory to snapshot
 * @param options - Configuration for how files should be scanned
 *    - ignoreBinaries: Skip contents of binary files (images, pdfs, etc.)
 *    - ignoreAll: Skip contents of all files (structure only)
 *    - token: Reserved for GitHub API use (not used in local scans)
 *    - structureOnly: If true, combine `filePath` + `fileName` into one
 */
export const cloneProject = (
  rootPath: string,
  options: ServiceOptions
) => {
  // Resolve the absolute path and extract just the project folder name
  const projectDirectoryName = basename(resolve(rootPath));

  console.log(`Scanning project: ${projectDirectoryName}`);

  // Recursively collect all files and metadata from the project directory
  const files = getProjectFiles(rootPath, options);

  console.log(`Scan complete. Total files: ${files?.length}`);

  // Save the snapshot to a JSON file named after the project
  writeFileSync(
    `${projectDirectoryName}.snapcube.json`,
    JSON.stringify(files, null, 4) // pretty-print with 4-space indentation
  );
  console.log("Snapshot saved");
};
