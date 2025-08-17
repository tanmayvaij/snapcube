import { isBinaryFile } from "../utils/isBinaryFile";

/**
 * Fetches and serializes all files in a GitHub repository into SnapCubeFile format.
 * Supports public & private repos (private requires a GitHub token).
 *
 * @param repository - Format: "owner/repo"
 * @param ignoreBinaries - If true, binary files (e.g., images, PDFs) will have content = null
 * @param ignoreAll - If true, ALL files will have content = null (only structure is saved)
 * @param token - (Optional) GitHub Personal Access Token for private repos or higher rate limits
 *
 * @returns Array of SnapCubeFile objects representing repo files
 *
 * @throws Error if the repo is not accessible, invalid, or token issues occur
 */
export const getGithubFiles = async (
  repository: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean,
  token?: string
) => {
  const files: SnapCubeFile[] = [];

  // Base API URL to list repo contents
  const repoUrl = `https://api.github.com/repos/${repository}/contents`;

  // Extract repo name (second part of "owner/repo")
  const repoName = repository.split("/")[1];

  /**
   * Recursively scans a repo path using GitHub API
   * @param path - Subpath within repo ("" = root)
   */
  const scanRepo = async (path: string) => {
    // Fetch directory listing from GitHub API
    const res = await fetch(`${repoUrl}/${path}`, {
      headers: token ? { Authorization: `token ${token}` } : {},
    });

    // Handle HTTP errors explicitly
    if (!res.ok) {
      if (res.status === 404) {
        if (!token)
          throw new Error(
            `Repository is private or does not exist: ${repository}. Please provide a GitHub token with --token.`
          );
        else throw new Error(`Repository not found: ${repository}`);
      } else if (res.status === 401)
        throw new Error(`Unauthorized. Your token may be invalid or expired.`);
      else
        throw new Error(
          `Failed to fetch repo: ${res.status} ${res.statusText}`
        );
    }

    // Parse the response JSON (array of files/folders)
    const objects = (await res.json()) as GithubRepoObject[];

    for (const object of objects) {
      if (object.type === "dir") {
        // Recurse into subdirectories
        await scanRepo(object.path);
      } else {
        // File case
        const isBinary = isBinaryFile(object.name);

        let content: string | null = null;

        // Fetch file content if not ignored
        if (!(ignoreAll || (ignoreBinaries && isBinary))) {
          const res = await fetch(object.download_url);

          if (isBinary)
            content = Buffer.from(await res.arrayBuffer()).toString("base64");
          else content = await res.text();
        }

        // Push file metadata + content
        files.push({
          fileName: object.name,
          filePath: `${repoName}/${object.path}`, // Prefix with repo name for clarity
          content,
          isBinary,
          encoding: isBinary ? "base64" : "utf-8",
          fileSizeInBytes: object.size,
        });
      }
    }
  };

  // Start scanning from repo root
  await scanRepo("");

  return files;
};
