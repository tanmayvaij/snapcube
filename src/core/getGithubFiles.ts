import { dirname } from "path";
import { isBinaryFile } from "../utils/isBinaryFile";

/**
 * Fetches and serializes all files in a GitHub repository into SnapCubeFile format.
 * Supports public & private repos (private requires a GitHub token).
 *
 * @param repository - Format: "owner/repo"
 * @param options - Configuration for how files should be scanned
 *    - ignoreBinaries: Skip contents of binary files (images, pdfs, etc.)
 *    - ignoreAll: Skip contents of all files (structure only)
 *    - token: Reserved for GitHub API use (not used in local scans)
 *    - structureOnly: If true, combine `filePath` + `fileName` into one
 *
 * @returns Array of SnapCubeFile objects or string representing repo files
 *
 * @throws Error if the repo is not accessible, invalid, or token issues occur
 */
export const getGithubFiles = async (
  repository: string,
  options: ServiceOptions
) => {
  const files: SnapCubeFile[] | string[] = [];

  // Base API URL to list repo contents
  const repoUrl = `https://api.github.com/repos/${repository}/contents`;

  // Extract repo name (second part of "owner/repo")
  const repoName = repository.split("/")[1]!;

  /**
   * Recursively scans a repo path using GitHub API
   * @param path - Subpath within repo ("" = root)
   */
  const scanRepo = async (path: string) => {
    // Fetch directory listing from GitHub API
    const res = await fetch(`${repoUrl}/${path}`, {
      headers: options.token ? { Authorization: `token ${options.token}` } : {},
    });

    // Handle HTTP errors explicitly
    if (!res.ok) {
      if (res.status === 404) {
        if (!options.token)
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
      } else if (options.structureOnly)
        (files as string[]).push(`${repoName}/${object.path}`);
      else {
        // File case
        const isBinary = isBinaryFile(object.name);

        let content: string | null = null;

        // Fetch file content if not ignored
        if (
          !(
            options.structureOnly ||
            options.ignoreAll ||
            (options.ignoreBinaries && isBinary)
          )
        ) {
          const res = await fetch(object.download_url);

          if (isBinary)
            content = Buffer.from(await res.arrayBuffer()).toString("base64");
          else content = await res.text();
        }

        const dir = dirname(object.path);

        // Push file metadata + content
        (files as SnapCubeFile[]).push({
          fileName: object.name,
          filePath: `${repoName}${dir === "." ? "" : `/${dir}`}`, // Prefix with repo name for clarity
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
