import { readFileSync, statSync } from "fs";
import { SnapCubeFile } from "../types";

/**
 * Validates whether a given file is a valid SnapCube JSON file.
 * Checks:
 *  - File exists and is a regular file
 *  - JSON parses successfully
 *  - JSON is an array
 *  - Each entry matches SnapCubeFile structure
 */
export const isSnapcubeJsonValid = (filePath: string) => {
  // Ensure path points to a file
  if (!statSync(filePath).isFile()) return false;

  let data: SnapCubeFile[];
  try {
    // Try to parse JSON
    data = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return false;
  }

  // Must be an array
  if (!Array.isArray(data)) return false;

  // Validate each file object
  for (const item of data) {
    if (
      typeof item.fileName !== "string" ||
      typeof item.filePath !== "string" ||
      typeof item.isBinary !== "boolean" ||
      typeof item.encoding !== "string" ||
      !("content" in item) // content must exist, can be null or string
    ) {
      return false;
    }
  }

  return true;
};
