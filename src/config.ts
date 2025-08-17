/**
 * Directories that should always be ignored while scanning a project.
 * These are typically build outputs, dependency folders, or VCS data.
 */
const IGNORE_DIRS = [
  "node_modules",
  ".git",
  ".next",
  "out",
  "dist",
  "__pycache__",
  "venv",
  "vender",
];

/**
 * File extensions considered binary.
 * These will be encoded in base64 if included in snapshots.
 */
const BINARY_EXTS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".svg",
  ".mp3",
  ".mp4",
];

export { IGNORE_DIRS, BINARY_EXTS };
