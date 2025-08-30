import { Octokit } from "@octokit/rest";
import { ServiceOptions, SnapCubeFile } from "../types";
import { isBinaryFile } from "../utils/isBinaryFile";
import { dirname } from "path";

export const getGithubFiles = async (
  repository: string,
  branch: string,
  options?: ServiceOptions
) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  const [owner, repo] = repository.split("/");

  if (!owner || !repo) {
    throw new Error("Invalid repository format. Expected 'owner/repo'.");
  }

  const files: SnapCubeFile[] | string[] = [];

  // Get the repository tree recursively
  const { data: tree } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: branch,
    recursive: "true",
  });

  const gitHubFiles = tree.tree.filter((file) => file.type === "blob");

  for (const file of gitHubFiles) {
    if (!file.path || !file.sha) continue;

    if (options?.structureOnly) {
      (files as string[]).push(file.path);
    } else {
      const isBinary = isBinaryFile(file.path);

      let content: string | null = null;

      if (!(options?.ignoreAll || (options?.ignoreBinaries && isBinary))) {
        const { data: fileData } = await octokit.repos.getContent({
          owner,
          repo,
          path: file.path,
          ref: branch,
        });

        if ("content" in fileData) {
          content = isBinary
            ? fileData.content
            : Buffer.from(fileData.content, "base64").toString("utf-8");
        }
      }

      const filePath = dirname(file.path);

      (files as SnapCubeFile[]).push({
        fileName: file.path.split("/").pop() || file.path,
        filePath: `${repo}${filePath === "." ? "" : "/" + filePath}`,
        content: content,
        isBinary,
        encoding: isBinary ? "base64" : "utf-8",
      });
    }
  }

  return files;
};
