# **Snapcube**

> **Clone and recreate complete project structures in seconds!** 🚀

Snapcube is a **lightweight CLI tool** that lets you snapshot your project’s entire directory tree (including file contents) into a single JSON file — and recreate it anywhere, instantly.
Perfect for **templates**, **backups**, **AI-assisted reviews**, and **team sharing**.

---

## ✨ **Features**

* 📦 **Project Cloning** – Save your project’s full structure into JSON
* 🏗 **Project Creation** – Rebuild projects exactly from saved JSON
* 🚫 **Smart Filtering** – Skips unnecessary directories like `node_modules`
* 🔄 **Recursive Scanning** – Handles deeply nested folder structures
* 📝 **Content Preservation** – Keeps all text and binary files intact
* ⚡ **Fast & Efficient** – Minimal disk and memory overhead

---

## 📦 **Installation**

Global install:

```bash
npm install -g snapcube
```

Local install (inside a project):

```bash
npm install snapcube
```

---

## 🚀 **Usage**

### **1. Clone a Project**

Save your project as a JSON snapshot:

```bash
snapcube clone <directory-path>
```

**Example:**

```bash
snapcube clone ./my-awesome-project
```

📄 This creates a `snapcube.json` file containing your entire project.

---

### **2. Recreate a Project**

Rebuild a project from a saved JSON snapshot:

```bash
snapcube create <json-file>
```

**Example:**

```bash
snapcube create snapcube.json
```

🛠 Restores **files, structure, and content** exactly as before.

---

## 📋 **Commands Overview**

| Command     | Description                    | Example                         |
| ----------- | ------------------------------ | ------------------------------- |
| `clone`     | Save project structure to JSON | `snapcube clone ./my-project`   |
| `create`    | Restore project from JSON      | `snapcube create snapcube.json` |
| `--help`    | Show help information          | `snapcube --help`               |
| `--version` | Show version number            | `snapcube --version`            |

---

## 📁 **JSON File Structure**

The generated `snapcube.json` contains an array of objects like:

```json
[
  {
    "name": "package.json",
    "path": "./",
    "content": "{\n  \"name\": \"my-project\"...\n}",
    "isBinary": false
  },
  {
    "name": "logo.png",
    "path": "./assets",
    "content": "iVBORw0KGgoAAAANSUhEUgAA...", 
    "isBinary": true
  }
]
```

---

## 🎯 **Use Cases**

* 📋 **Project Templates** – Distribute starter kits instantly
* 🔄 **Backup & Restore** – Keep portable, lightweight project backups
* 🤝 **Collaboration** – Share codebases with teammates without Git
* 📚 **Education** – Distribute coding examples & tutorials
* 🤖 **AI Code Review** – Share snapshots with AI for instant analysis

---

## ⚙️ **How It Works**

**Cloning Process**

1. Scans the target directory recursively
2. Skips ignored folders (`node_modules`, `.git`, etc.)
3. Reads each file (Base64 for binary, UTF-8 for text)
4. Saves the data to `snapcube.json`

**Creation Process**

1. Reads the snapshot JSON
2. Creates all required folders
3. Writes files with their original content
4. Preserves directory structure exactly

---

## 🚫 **Ignored by Default**

* `node_modules/`
* `.git/` and other hidden directories
* `.next/`, `dist/`, and other build outputs

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
