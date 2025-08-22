import { readdirSync, readFileSync, statSync } from "fs";
import { basename, join, relative, resolve } from "path";

import { IGNORE_DIRS } from "../config";
import { isBinaryFile } from "../utils/isBinaryFile";

/**
 * Scans a local project directory and returns metadata + content
 * for every file, formatted as SnapCubeFile objects.
 *
 * @param rootPath - The absolute or relative path of the project directory
 * @param options - Configuration for how files should be scanned
 *    - ignoreBinaries: Skip contents of binary files (images, pdfs, etc.)
 *    - ignoreAll: Skip contents of all files (structure only)
 *    - token: Reserved for GitHub API use (not used in local scans)
 *    - structureOnly: If true, combine `filePath` + `fileName` into one
 *
 * @returns An array of SnapCubeFile objects or string representing the project
 *
 * @throws Error if the provided path is not a directory
 */

export const getProjectFiles = (rootPath: string, options: ServiceOptions) => {
  const files: SnapCubeFile[] | string[] = [];

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
        const filePath = join(
          basename(resolve(rootPath)), // Project root folder name
          relative(rootPath, object.parentPath) // Relative subpath inside project
        );

        // Push metadata + content into result array
        if (options.structureOnly)
          (files as string[]).push(`${filePath}/${object.name}`);
        else {
          const isBinary = isBinaryFile(object.name);

          let content: string | null = null;

          // Only read file contents if not ignored
          if (
            !(
              options.structureOnly ||
              options.ignoreAll ||
              (options.ignoreBinaries && isBinary)
            )
          )
            content = readFileSync(fullPath).toString(
              isBinary ? "base64" : "utf-8"
            );

          (files as SnapCubeFile[]).push({
            fileName: object.name,
            filePath,
            content,
            isBinary,
            encoding: isBinary ? "base64" : "utf-8",
            fileSizeInBytes: statSync(fullPath).size,
          });
        }
      }
    }
  };

  // Start recursive scan from project root
  scanDir(rootPath);

  return files;
};
