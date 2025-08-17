# **Snapcube**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Clone and recreate complete project structures in seconds!** 🚀

Snapcube is a **lightweight CLI tool** that snapshots your project’s **entire directory tree** (including or excluding file contents) into a single JSON file — and recreates it anywhere instantly.
Perfect for **templates**, **backups**, **AI-assisted reviews**, and **team sharing**.

---

## ✨ **Features**

* 📦 **Local Project Cloning** – Save your project’s structure and contents into JSON
* 🌐 **GitHub Repo Cloning** – Fetch any public GitHub repository directly into JSON (no manual download needed)
* 🔑 **Private Repo Cloning** – Clone **private GitHub repositories** by passing a Personal Access Token (`--token`)
* 🏗 **Project Creation** – Rebuild projects exactly from saved JSON
* 🚫 **Smart Filtering** – Skips unnecessary directories like `node_modules`
* 🔄 **Recursive Scanning** – Handles deeply nested folder structures
* 📝 **Content Control** – Choose to include **all**, **only non-binary**, or **no** file contents
* ⚡ **Fast & Efficient** – Minimal disk and memory overhead
* ✅ **Validation** – Detects and warns if a `.snapcube.json` is invalid before creation

---

## 📦 **Installation**

### **Global Install (recommended for frequent use)**

```bash
npm install -g snapcube
```

Then use it anywhere:

```bash
snapcube clone ./my-project
```

---

### **Using Without Installation (`npx`)**

If you don’t want to install globally, you can run Snapcube directly:

```bash
npx snapcube clone ./my-project
```

💡 **Notes for `npx` usage**:

* On first run, `npx` downloads the package temporarily.
* You **must** have Node.js installed (version 18+ recommended).
* If you get `command not found`, try again — sometimes the first run only fetches dependencies.

**Example workflow with `npx`**:

```bash
# Clone a project structure without binary contents
npx snapcube clone ./my-project --ignore-binaries

# Restore it later
npx snapcube create my-project.snapcube.json
```

---

## 🚀 **Usage Examples**

### **1. Clone a Local Project**

```bash
snapcube clone <directory-path>
```

Example:

```bash
snapcube clone ./my-awesome-project
```

This will generate:

```
my-awesome-project.snapcube.json
```

---

### **2. Clone a GitHub Repository**

```bash
snapcube clone-repo <username/repo>
```

Examples:

```bash
# Clone Snapcube repo itself
snapcube clone-repo tanmayvaij/snapcube

# Clone without binary file contents
snapcube clone-repo tanmayvaij/artistly --ignore-binaries

# Clone only structure (no file contents)
snapcube clone-repo tanmayvaij/artistly --ignore-all
```

📄 Generates `{repo-name}.snapcube.json`.

---

### **🔑 Clone a Private GitHub Repository**

Private repositories require authentication with a **GitHub Personal Access Token**.

```bash
snapcube clone-repo username/private-repo --token <your_github_token>
```

Examples:

```bash
# Clone a private repo fully
snapcube clone-repo myorg/secret-project --token ghp_xxx123abc

# Clone private repo but skip binary files
snapcube clone-repo myorg/secret-project --ignore-binaries --token ghp_xxx123abc
```

⚠️ If you try cloning a private repo without `--token`, Snapcube will throw an error:

```
Repository is private or does not exist: username/private-repo. Please provide a GitHub token with --token.
```

👉 **How to generate a GitHub token**:

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens).
2. Click **Generate new token** → Choose **classic token** (for now).
3. Select scopes:

   * `repo` (to access private repos)
   * `read:packages` (optional, if needed)
4. Copy the generated token and use it with `--token`.

---

### **3. Recreate a Project**

```bash
snapcube create <json-file>
```

Example:

```bash
snapcube create my-awesome-project.snapcube.json
```

The project will be recreated inside a folder named after the original project.

---

## 📋 **Commands & Flags**

| Command / Option    | Description                                                       | Example                                                |
| ------------------- | ----------------------------------------------------------------- | ------------------------------------------------------ |
| `clone`             | Save local project structure to JSON                              | `snapcube clone ./my-project`                          |
| `clone-repo`        | Save structure of a **GitHub repo** to JSON                       | `snapcube clone-repo tanmayvaij/snapcube`              |
| `create`            | Restore project from JSON                                         | `snapcube create my-project.snapcube.json`             |
| `--ignore-binaries` | Ignore content of binary files (images, PDFs, videos, etc.)       | `snapcube clone ./my-project --ignore-binaries`        |
| `--ignore-all`      | Ignore content of **all files** — only structure & metadata saved | `snapcube clone ./my-project --ignore-all`             |
| `--token <token>`   | Provide GitHub token for **private repos**                        | `snapcube clone-repo username/private --token ghp_xxx` |
| `--help`            | Show help information                                             | `snapcube --help`                                      |
| `--version`         | Show version number                                               | `snapcube --version`                                   |

💡 **Tip:** If both `--ignore-all` and `--ignore-binaries` are provided, `--ignore-all` takes priority.

---

## 📁 **JSON File Structure**

Example output:

```json
[
  {
    "fileName": "package.json",
    "filePath": "my-awesome-project",
    "content": "{\n  \"name\": \"my-project\"...\n}",
    "isBinary": false,
    "encoding": "utf-8",
    "fileSizeInBytes": 245
  },
  {
    "fileName": "logo.png",
    "filePath": "my-awesome-project/assets",
    "content": null,
    "isBinary": true,
    "encoding": "base64",
    "fileSizeInBytes": 53214
  }
]
```

---

## 🎯 **Use Cases**

* 📋 **Project Templates** – Distribute starter kits instantly
* 🔄 **Backup & Restore** – Keep lightweight project backups
* 🌐 **Clone GitHub Repos to JSON** – Store snapshots for later use
* 🔑 **Private Repo Snapshots** – Archive or share internal projects securely
* 🤝 **Collaboration** – Share codebases without using Git
* 📚 **Education** – Distribute coding examples & tutorials
* 🤖 **AI Code Review** – Send `.snapcube.json` for AI-assisted debugging

---

## ⚙️ **How It Works**

### **Cloning Process**

1. Scans the target directory or GitHub repo recursively
2. Skips ignored folders (`node_modules`, `.git`, etc.)
3. Reads file content (Base64 for binary, UTF-8 for text) unless ignored
4. Saves everything to a `.snapcube.json` file

### **Creation Process**

1. Validates the `.snapcube.json` format
2. Creates necessary folders
3. Restores files with their original content (if available)
4. Recreates the exact directory structure

---

## 🚫 **Ignored by Default**

* `node_modules/`
* `.git/` and hidden directories
* `.next/`, `dist/`, and build output folders

---

## 🤝 **Contributing**

1. 🍴 Fork the repo
2. 🌱 Create a branch: `git checkout -b feature/AmazingFeature`
3. 💾 Commit changes: `git commit -m "Add some AmazingFeature"`
4. 📤 Push: `git push origin feature/AmazingFeature`
5. 🎉 Open a Pull Request

---

## 🐛 **Issues & Support**

* 🐞 [Report a Bug](https://github.com/tanmayvaij/snapcube/issues)
* 💡 [Request a Feature](https://github.com/tanmayvaij/snapcube/issues/new)
* 📧 Email: **[tanmayvaij22@gmail.com](mailto:tanmayvaij22@gmail.com)**

---

## 🙏 **Acknowledgments**

* Built with ❤️ using Node.js + Commander.js
* Inspired by the need for quick project structure sharing
* Thanks to all contributors and early adopters

---

<div align="center">

**⭐ If you like Snapcube, star the repo to support development!**

Made with 💖 by [Tanmay Vaij](https://github.com/tanmayvaij)

</div>
