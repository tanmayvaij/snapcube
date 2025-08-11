import { writeFileSync } from "fs";

import { getProjectFiles } from "../core/getProjectFiles";

export const cloneProject = (
  rootPath: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean
) => {
  console.log(`📂 Scanning project: ${rootPath}`);

  const files = getProjectFiles(rootPath, ignoreBinaries, ignoreAll);

  console.log(`✅ Scan complete. Total files: ${files.length}`);

  writeFileSync("snapcube.json", JSON.stringify(files, null, 4));
  console.log("💾 Snapshot saved");
};
