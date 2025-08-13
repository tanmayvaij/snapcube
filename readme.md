# **Snapcube**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Clone and recreate complete project structures in seconds!** 🚀

Snapcube is a **lightweight CLI tool** that snapshots your project’s **entire directory tree** (including or excluding file contents) into a single JSON file — and recreates it anywhere instantly.
Perfect for **templates**, **backups**, **AI-assisted reviews**, and **team sharing**.

---

## ✨ **Features**

* 📦 **Project Cloning** – Save your project’s structure and contents into JSON
* 🏗 **Project Creation** – Rebuild projects exactly from saved JSON
* 🚫 **Smart Filtering** – Skips unnecessary directories like `node_modules`
* 🔄 **Recursive Scanning** – Handles deeply nested folder structures
* 📝 **Content Control** – Choose to include **all**, **only non-binary**, or **no** file contents
* ⚡ **Fast & Efficient** – Minimal disk and memory overhead

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

If you don’t want to install it globally, you can run Snapcube directly using **npx**:

```bash
npx snapcube clone ./my-project
```

💡 **Notes for `npx` usage**:

* On first run, `npx` will download the package temporarily.
* You **must** have Node.js installed (version 18+ recommended).
* If you get `command not found` after confirming install, try running again — sometimes the first run only fetches dependencies.

**Example workflow with `npx`**:

```bash
# Clone a project structure without binary contents
npx snapcube clone ./my-project --ignore-binaries

# Restore it later
npx snapcube create my-project.snapcube.json
```

---

## 🚀 **Usage Examples**

### **1. Clone a Project**

```bash
snapcube clone <directory-path>
```

Example:

```bash
snapcube clone ./my-awesome-project
```

This will generate `my-awesome-project.snapcube.json` containing your project’s structure and optionally contents.

---

### **2. Recreate a Project**

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

| Command / Option    | Description                                                       | Example                                         |
| ------------------- | ----------------------------------------------------------------- | ----------------------------------------------- |
| `clone`             | Save project structure to JSON                                    | `snapcube clone ./my-project`                   |
| `create`            | Restore project from JSON                                         | `snapcube create my-project.snapcube.json`      |
| `--ignore-binaries` | Ignore content of binary files (images, PDFs, videos, etc.)       | `snapcube clone ./my-project --ignore-binaries` |
| `--ignore-all`      | Ignore content of **all files** — only structure & metadata saved | `snapcube clone ./my-project --ignore-all`      |
| `--help`            | Show help information                                             | `snapcube --help`                               |
| `--version`         | Show version number                                               | `snapcube --version`                            |

💡 **Tip:** If both `--ignore-all` and `--ignore-binaries` are provided, `--ignore-all` takes priority.

---

## 📁 **JSON File Structure**

The generated JSON looks like this:

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
* 🤝 **Collaboration** – Share codebases without using Git
* 📚 **Education** – Distribute coding examples & tutorials
* 🤖 **AI Code Review** – Send a `.snapcube.json` for AI-assisted debugging

---

## ⚙️ **How It Works**

### **Cloning Process**

1. Scans the target directory recursively
2. Skips ignored folders (`node_modules`, `.git`, etc.)
3. Reads file content (Base64 for binary, UTF-8 for text) unless ignored
4. Saves everything to a `.snapcube.json` file

### **Creation Process**

1. Validates the JSON file format
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
