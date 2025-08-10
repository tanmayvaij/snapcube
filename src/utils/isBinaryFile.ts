import { extname } from "path";
import { BINARY_EXTS } from "../config";

export const isBinaryFile = (fileName: string) =>
  BINARY_EXTS.includes(extname(fileName.toLowerCase()));
