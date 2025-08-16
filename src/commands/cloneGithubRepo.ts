import { writeFileSync } from "fs";
import { getGithubFiles } from "../core/getGithubFiles";

export const cloneGithubRepo = async (
  repository: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean
) => {
  const [owner, repoName] = repository.split("/");

  console.log(`📂 Scanning project: ${repoName}`);

  const files = await getGithubFiles(repository, ignoreBinaries, ignoreAll);

  console.log(`✅ Scan complete. Total files: ${files?.length}`);

  writeFileSync(
    `${owner}_${repoName}.snapcube.json`,
    JSON.stringify(files, null, 4)
  );
  console.log("💾 Snapshot saved");
};
