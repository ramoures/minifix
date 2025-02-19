# minifix

<p align="center">
    <img alt="minifix" src="./minifix.svg" width="200"/>
</p>

[![npm version](https://img.shields.io/npm/v/minifix)](https://www.npmjs.com/package/minifix)
[![License](https://img.shields.io/github/license/ramoures/minifix)](LICENSE)
[![Issues](https://img.shields.io/github/issues/ramoures/minifix)](https://github.com/ramoures/minifix/issues)

A lightweight and flexible minifier for **JavaScript, CSS, and HTML** with live file-watching support.

## 🚀 Features

✅ Minifies JavaScript, CSS, and HTML efficiently\
✅ Supports live watching for automatic minification\
✅ Configurable options for each file type\
✅ Lightweight and easy to use

Powered by:

- [Terser (JS Minifier)](https://terser.org)
- [clean-css (CSS Minifier)](https://github.com/clean-css/)
- [html-minifier-terser (HTML Minifier)](https://github.com/terser/html-minifier-terser)

## 📋 Requirements

Before installing **minifix**, make sure your environment meets the following requirements:

- **Node.js** `14+` (recommended `16+`)
- **NPM** `6.14+` (recommended `8+`)

## 📦 Installation

Before installing **minifix**, consider whether you need a **local** or **global** installation:  

- A **local installation** is recommended for project-specific usage, ensuring that each project uses the correct version of **minifix**.  
- A **global installation** allows you to use **minifix** across multiple projects system-wide without reinstalling it.

****

### Local Installation

```sh
npm install --save-dev minifix
```

### Global Installation

```sh
npm install --global minifix
```

## 🚀 Usage

### Running Locally

```sh
npx minifix
```

### Running Globally

```sh
minifix
```

📌 If `minifix.config.mjs` does not exist, it will be created automatically.

## 📂 Supported File Types

minifix supports minification for:

- **JavaScript** (`.js`,`.mjs`,`.cjs`)
- **HTML** (`.html`,`.htm`)
- **CSS** (`.css`)

## ⚙️ Configuration

Edit the `minifix.config.mjs` file to define input files, output files, and minification options.

### Available Options

- **inputs** - List of input files  
- **outputs** (optional) - List of output files. If not provided, a default output file will be created in the same directory as the input file with `_output_` appended to its name.  
- **minifyOptions** - Minification options for each file type

📌 Refer to the official documentation for **minifyOptions**:

- [JS options](https://terser.org/docs/options/)
- [CSS options](https://github.com/clean-css/clean-css#constructor-options)
- [HTML options](https://github.com/terser/html-minifier-terser#options-quick-reference)

### Example Configuration

```js
/* minifix.config.mjs */
export default {
    inputs: ["views/input.html", "assets/css/input.css", "assets/js/input.js"],
    outputs: ["views/index.html", "assets/css/style.css", "assets/js/default.js"],
    minifyOptions: {
        css: {
            format: false
        },
        js: {
            format: {
                preamble: "/** Comment */"
            }
        },
        html: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true
        }
    }
};
```

## Contributing

We appreciate any contributions!

If you encounter any issues, please open an issue in our GitHub repository:

➡️ [GitHub Repository](https://github.com/ramoures/minifix)  
[➡️ Create a new issue](https://github.com/ramoures/minifix/issues)

For feature requests or bug reports, follow these steps:

1. Check the [existing issues](https://github.com/ramoures/minifix/issues) to avoid duplicates.
2. If the issue is new, create one with a clear description and steps to reproduce.
3. If you’d like to submit code changes, fork the repository and create a pull request.

## 📜 License

minifix is released under the [MIT License](LICENSE).

## 📫 Support

If you have any questions, feel free to reach out: [ramoures@gmail.com](mailto:ramoures@gmail.com)
