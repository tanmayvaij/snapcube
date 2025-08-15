import { isBinaryFile } from "../utils/isBinaryFile";

export const getGithubFiles = async (
  baseRepoUrl: string,
  ignoreBinaries?: boolean,
  ignoreAll?: boolean
) => {
  const files: SnapCubeFile[] = [];

  const scanRepo = async (path: string) => {
    const res = await fetch(`${baseRepoUrl}/${path}`);
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
          filePath: object.path,
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

// (async () => {
//   console.log(
//     await getGithubFiles(
//       "https://api.github.com/repos/tanmayvaij/snapcube/contents"
//     )
//   );
// })();
