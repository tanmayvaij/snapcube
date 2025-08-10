import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join } from "path";

import { IGNORE_DIRS } from "../config";
import { isBinaryFile } from "../utils/isBinaryFile";

export const cloneProject = (
  rootPath: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean
) => {
  console.log(`📂 Scanning project: ${rootPath}`);

  const files: SnapCubeFile[] = [];

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

        let content: string | null = null;

        if (!(ignoreAll || (ignoreBinaries && isBinary)))
          content = readFileSync(fullPath).toString(
            isBinary ? "base64" : "utf-8"
          );

        files.push({
          fileName: object.name,
          filePath: object.parentPath,
          content,
          isBinary,
          encoding: isBinary ? "base64" : "utf-8",
          fileSizeInBytes: statSync(fullPath).size,
        });
      }
    }
  };

  scanDir(rootPath);
  console.log(`✅ Scan complete. Total files: ${files.length}`);

  writeFileSync("snapcube.json", JSON.stringify(files, null, 4));
  console.log("💾 Snapshot saved");
};
