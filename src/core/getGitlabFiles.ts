import { Gitlab } from "@gitbeaker/rest";
import { ServiceOptions, SnapCubeFile } from "../types";
import { isBinaryFile } from "../utils/isBinaryFile";
import { dirname } from "path";

export const getGitlabFiles = async (
  repository: string,
  branch: string,
  options?: ServiceOptions
) => {
  const api = new Gitlab({ host: "https://gitlab.com", token: options?.token });

  const files: SnapCubeFile[] | string[] = [];

  const tree = await api.Repositories.allRepositoryTrees(repository, {
    recursive: true,
    ref: branch,
  });

  const gitlabFiles = tree.filter((file) => file.type === "blob");

  for (const file of gitlabFiles) {
    if (options?.structureOnly) (files as string[]).push(file.path);
    else {
      const isBinary = isBinaryFile(file.name);

      let content: string | null = null;

      if (!(options?.ignoreAll || (options?.ignoreBinaries && isBinary))) {
        const schema = await api.RepositoryFiles.show(
          repository,
          file.path,
          branch
        );

        content = isBinary
          ? schema.content
          : Buffer.from(schema.content, "base64").toString("utf-8");
      }

      const filePath = dirname(file.path);

      (files as SnapCubeFile[]).push({
        fileName: file.name,
        filePath: `${repository.split("/")[1]}${
          filePath === "." ? "" : `/${filePath}`
        }`,
        content:
          file.type === "blob"
            ? content
            : Buffer.from(content!, "base64").toString("utf-8"),
        isBinary,
        encoding: isBinary ? "base64" : "utf-8",
      });
    }
  }

  return files;
};
