import { readFileSync, statSync } from "fs";

export const isSnapcubeJsonValid = (filePath: string) => {
  if (!statSync(filePath).isFile()) return false;

  let data: SnapCubeFile[];
  try {
    data = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return false;
  }

  if (!Array.isArray(data)) return false;

  for (const item of data) {
    if (
      typeof item.fileName !== "string" ||
      typeof item.filePath !== "string" ||
      typeof item.isBinary !== "boolean" ||
      typeof item.encoding !== "string" ||
      typeof item.fileSizeInBytes !== "number" ||
      !("content" in item)
    ) {
      return false;
    }
  }

  return true;
};
