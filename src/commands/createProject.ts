import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export const createProject = (filePath: string) => {
  console.log(`📂 Restoring project from: ${filePath}`);

  const data = JSON.parse(readFileSync(filePath, "utf-8")) as SnapCubeFile[];

  for (const file of data) {
    mkdirSync(file.filePath, { recursive: true });

    const fullPath = join(file.filePath, file.fileName);

    if (file.content === null) {
      console.log(`⚠️ Skipping content for ignored file: ${fullPath}`);
      continue;
    }

    if (file.isBinary) {
      console.log(`🖼 Restoring binary file: ${fullPath}`);
      writeFileSync(fullPath, Buffer.from(file.content, "base64"));
    } else {
      console.log(`✏️ Restoring text file: ${fullPath}`);
      writeFileSync(fullPath, file.content, "utf-8");
    }
  }

  console.log(`✅ Project restored successfully.`);
};
