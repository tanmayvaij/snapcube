import { writeFileSync } from "fs";
import { getGithubFiles } from "../core";

/**
 * Clone (snapshot) a GitHub repository into a JSON file.
 *
 * @param repository - Repository in the format "owner/repo"
 * @param ignoreBinaries - If true, skips storing binary file contents (keeps metadata only)
 * @param ignoreAll - If true, skips storing all file contents (keeps only structure + metadata)
 * @param token - Optional GitHub personal access token (required for private repos or higher rate limits)
 */
export const cloneGithubRepo = async (
  repository: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean,
  token?: string
) => {
  // Split "owner/repo" into separate variables
  const [owner, repoName] = repository.split("/");

  console.log(`Scanning project: github:${owner}/${repoName}`);

  // Fetch all files and metadata from the GitHub API
  const files = await getGithubFiles(
    repository,
    ignoreBinaries,
    ignoreAll,
    token
  );

  console.log(`Scan complete. Total files: ${files?.length}`);

  // Save the snapshot to a JSON file named after the repo
  writeFileSync(
    `${owner}_${repoName}.snapcube.json`,
    JSON.stringify(files, null, 4) // pretty-print with 4-space indentation
  );
  console.log("Snapshot saved");
};
