import { readdirSync, readFileSync, statSync } from "fs";
import { basename, join, relative, resolve } from "path";

import { IGNORE_DIRS } from "../config";
import { isBinaryFile } from "../utils/isBinaryFile";

export const getProjectFiles = (
  rootPath: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean
) => {
  const files: SnapCubeFile[] = [];

  const scanDir = (path: string) => {
    for (const object of readdirSync(path, { withFileTypes: true })) {
      const fullPath = join(object.parentPath, object.name);

      if (object.isDirectory()) {
        if (IGNORE_DIRS.includes(object.name)) continue;

        scanDir(fullPath);
      } else {
        const isBinary = isBinaryFile(object.name);

        let content: string | null = null;

        if (!(ignoreAll || (ignoreBinaries && isBinary)))
          content = readFileSync(fullPath).toString(
            isBinary ? "base64" : "utf-8"
          );

        files.push({
          fileName: object.name,
          filePath: join(
            basename(resolve(rootPath)),
            relative(rootPath, object.parentPath)
          ),
          content,
          isBinary,
          encoding: isBinary ? "base64" : "utf-8",
          fileSizeInBytes: statSync(fullPath).size,
        });
      }
    }
  };

  scanDir(rootPath);

  return files;
};
