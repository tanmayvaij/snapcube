import { readdirSync, readFileSync, statSync } from "fs";
import { basename, join, relative, resolve } from "path";

import { IGNORE_DIRS } from "../config";
import { isBinaryFile } from "../utils/isBinaryFile";

/**
 * Scans a local project directory and returns metadata + content
 * for every file, formatted as SnapCubeFile objects.
 *
 * @param rootPath - The absolute or relative path of the project directory
 * @param ignoreBinaries - If true, binary files (e.g. images, PDFs) will have `content = null`
 * @param ignoreAll - If true, ALL files will have `content = null` (only structure saved)
 *
 * @returns An array of SnapCubeFile objects representing the project
 *
 * @throws Error if the provided path is not a directory
 */
export const getProjectFiles = (
  rootPath: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean
) => {
  const files: SnapCubeFile[] = [];

  // Validate input path: must be a directory
  if (!statSync(rootPath).isDirectory())
    throw new Error("Error: provided path is not a directory");

  /**
   * Recursively scans a directory and collects file info
   * @param path - Current path being scanned
   */
  const scanDir = (path: string) => {
    for (const object of readdirSync(path, { withFileTypes: true })) {
      const fullPath = join(object.parentPath, object.name);

      if (object.isDirectory()) {
        // Skip ignored directories like node_modules, .git, dist, etc.
        if (IGNORE_DIRS.includes(object.name)) continue;

        // Recursive scan
        scanDir(fullPath);
      } else {
        const isBinary = isBinaryFile(object.name);

        let content: string | null = null;

        // Only read file contents if not ignored
        if (!(ignoreAll || (ignoreBinaries && isBinary)))
          content = readFileSync(fullPath).toString(
            isBinary ? "base64" : "utf-8"
          );

        // Push metadata + content into result array
        files.push({
          fileName: object.name,
          filePath: join(
            basename(resolve(rootPath)), // Project root folder name
            relative(rootPath, object.parentPath) // Relative subpath inside project
          ),
          content,
          isBinary,
          encoding: isBinary ? "base64" : "utf-8",
          fileSizeInBytes: statSync(fullPath).size,
        });
      }
    }
  };

  // Start recursive scan from project root
  scanDir(rootPath);

  return files;
};
