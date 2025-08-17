import { extname } from "path";
import { BINARY_EXTS } from "../config";

/**
 * Checks if a given file is binary based on its extension.
 *
 * @param fileName - The name of the file (with extension)
 * @returns true if the file extension is in the known binary extensions list, false otherwise
 */
export const isBinaryFile = (fileName: string) =>
  BINARY_EXTS.includes(extname(fileName.toLowerCase()));
