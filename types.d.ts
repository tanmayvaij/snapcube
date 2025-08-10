interface SnapCubeFile {
  fileName: string;
  filePath: string;
  content: string | null;
  isBinary: boolean;
  encoding: "base64" | "utf-8";
  fileSizeInBytes: number;
}
