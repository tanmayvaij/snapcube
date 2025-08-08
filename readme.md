# 🎲 Snapcube

> **Clone and recreate project structures with a single command!** 🚀

Snapcube is a powerful CLI tool that allows you to save your project structure to JSON and recreate it anywhere. Perfect for project templates, backups, or sharing project scaffolds with your team.

## ✨ Features

- 📁 **Clone Projects**: Save entire project structures to JSON format
- 🏗️ **Recreate Projects**: Rebuild projects from saved JSON files  
- 🚫 **Smart Filtering**: Automatically excludes `node_modules` and other unwanted directories
- 🔄 **Recursive Directory Reading**: Handles nested folder structures seamlessly
- 📝 **Preserves Content**: Maintains all file contents and directory structure
- ⚡ **Lightning Fast**: Efficient file operations with minimal overhead

## 🛠️ Installation

```bash
npm install -g snapcube
```

Or install locally in your project:

```bash
npm install snapcube
```

## 🚀 Usage

### Clone a Project Structure

Save your current project structure to a JSON file:

```bash
snapcube clone <directory-path>
```

**Example:**
```bash
snapcube clone ./my-awesome-project
```

This creates a `snapcube.json` file containing your entire project structure.

### Create Project from JSON

Recreate a project structure from a saved JSON file:

```bash
snapcube create <json-file>
```

**Example:**
```bash
snapcube create snapcube.json
```

## 📋 Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `clone` | 📦 Save project structure to JSON | `snapcube clone <dir>` |
| `create` | 🏗️ Create project from JSON file | `snapcube create <json-file>` |
| `--help` | ❓ Show help information | `snapcube --help` |
| `--version` | ℹ️ Show version number | `snapcube --version` |

## 📁 File Structure

The generated JSON file contains an array of file objects with this structure:

```json
[
  {
    "name": "package.json",
    "path": "./src",
    "content": "{\n  \"name\": \"my-project\"...\n}"
  },
  {
    "name": "index.js",
    "path": "./src",
    "content": "console.log('Hello World!');"
  }
]
```

## 🎯 Use Cases

- 📋 **Project Templates**: Create reusable project scaffolds
- 🔄 **Backup & Restore**: Save project snapshots for later restoration
- 👥 **Team Collaboration**: Share project structures with team members
- 📚 **Educational**: Distribute coding examples and tutorials
- 🚀 **Deployment**: Package projects for different environments

## ⚙️ How It Works

### Clone Process
1. 🔍 Recursively scans the specified directory
2. 📋 Filters out unwanted files (like `node_modules`)
3. 📖 Reads file contents and metadata
4. 💾 Serializes everything to `snapcube.json`

### Create Process
1. 📄 Parses the JSON structure file
2. 📁 Creates necessary directories recursively
3. ✍️ Writes all files with their original content
4. ✅ Preserves the exact directory structure

## 🚫 Excluded Files & Directories

Snapcube automatically excludes:
- 📦 `node_modules/` directories
- 🔒 Hidden files and directories (starting with `.`)
- 🗑️ System files and caches

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. 🍴 Fork the project
2. 🌟 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

## 🐛 Issues & Support

Found a bug or have a suggestion? 

- 🐛 [Report Issues](https://github.com/tanmayvaij/snapcube/issues)
- 💡 [Request Features](https://github.com/tanmayvaij/snapcube/issues/new)
- 📧 Contact: tanmayvaij22@gmail.com

## 🙏 Acknowledgments

- Built with ❤️ using Node.js and Commander.js
- Inspired by the need for simple project structure management
- Thanks to all contributors who help make this tool better!

---

<div align="center">

**⭐ Star this repo if you found it helpful! ⭐**

Made with 💖 by Tanmay Vaij

</div>