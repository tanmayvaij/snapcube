import { isBinaryFile } from "../utils/isBinaryFile";

export const getGithubFiles = async (
  repository: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean
) => {
  const files: SnapCubeFile[] = [];

  const repoUrl = `https://api.github.com/repos/${repository}/contents`;

  const repoName = repository.split("/")[1];

  const scanRepo = async (path: string) => {
    const res = await fetch(`${repoUrl}/${path}`);

    if (!res.ok) {
      if (res.status === 404)
        throw new Error(`Repository or path not found: ${repository}/${path}`);
      else
        throw new Error(
          `Failed to fetch repo: ${res.status} ${res.statusText}`
        );
    }

    const objects = (await res.json()) as GithubRepoObject[];

    for (const object of objects) {
      if (object.type === "dir") await scanRepo(object.path);
      else {
        const isBinary = isBinaryFile(object.name);

        let content: string | null = null;

        if (!(ignoreAll || (ignoreBinaries && isBinary))) {
          const res = await fetch(object.download_url);

          if (isBinary)
            content = Buffer.from(await res.arrayBuffer()).toString("base64");
          else content = await res.text();
        }

        files.push({
          fileName: object.name,
          filePath: `${repoName}/${object.path}`,
          content,
          isBinary,
          encoding: isBinary ? "base64" : "utf-8",
          fileSizeInBytes: object.size,
        });
      }
    }
  };

  await scanRepo("");

  return files;
};
