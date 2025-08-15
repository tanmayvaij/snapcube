interface SnapCubeFile {
  fileName: string;
  filePath: string;
  content: string | null;
  isBinary: boolean;
  encoding: "base64" | "utf-8";
  fileSizeInBytes: number;
}

interface GithubRepoObject {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file" | "dir";
  content?: string;
  encoding?: "base64";
  _links: {
    self: string;
    git: string;
    html: string;
  };
}
