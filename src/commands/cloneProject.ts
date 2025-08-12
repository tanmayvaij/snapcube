import { writeFileSync } from "fs";
import { basename, resolve } from "path";

import { getProjectFiles } from "../core/getProjectFiles";

export const cloneProject = (
  rootPath: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean
) => {
  const projectDirectoryName = basename(resolve(rootPath));

  console.log(`📂 Scanning project: ${projectDirectoryName}`);

  const files = getProjectFiles(rootPath, ignoreBinaries, ignoreAll);

  console.log(`✅ Scan complete. Total files: ${files.length}`);

  writeFileSync(
    `${projectDirectoryName}.snapcube.json`,
    JSON.stringify(files, null, 4)
  );
  console.log("💾 Snapshot saved");
};
