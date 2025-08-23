import { writeFileSync } from "fs";
import { getGithubFiles } from "../core";

/**
 * Clone (snapshot) a GitHub repository into a JSON file.
 *
 * @param repository - Repository in the format "owner/repo"
 * @param options - Configuration for how files should be scanned
 *    - ignoreBinaries: Skip contents of binary files (images, pdfs, etc.)
 *    - ignoreAll: Skip contents of all files (structure only)
 *    - token: Reserved for GitHub API use (not used in local scans)
 *    - structureOnly: If true, combine `filePath` + `fileName` into one
 */
export const cloneGithubRepo = async (
  repository: string,
  options?: ServiceOptions
) => {
  // Split "owner/repo" into separate variables
  const [owner, repoName] = repository.split("/");

  console.log(`Scanning project: github:${owner}/${repoName}`);

  // Fetch all files and metadata from the GitHub API
  const files = await getGithubFiles(repository, options);

  console.log(`Scan complete. Total files: ${files?.length}`);

  // Save the snapshot to a JSON file named after the repo
  writeFileSync(
    `${owner}_${repoName}.snapcube.json`,
    JSON.stringify(files, null, 4) // pretty-print with 4-space indentation
  );
  console.log("Snapshot saved");
};
