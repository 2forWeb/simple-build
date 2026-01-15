#!/usr/bin/env node
// src/process/build-task.ts
import * as esbuild from "esbuild";
import path from "path";

// src/util/colors.ts
var colors = {
  red: "\x1B[31m",
  green: "\x1B[32m",
  blue: "\x1B[34m",
  yellow: "\x1B[33m",
  white: "\x1B[37m",
  reset: "\x1B[0m",
  bold: "\x1B[1m",
  resetBold: "\x1B[22m"
};
var color = (color2, text) => `${colors[color2]}${text}${colors.reset}`;
var bold = (text) => `${colors.bold}${text}${colors.resetBold}`;

// src/util/is-dev.ts
import "dotenv/config";
function isDev() {
  return process.env.APP_ENV === "dev";
}

// src/process/build-task.ts
import { clean } from "esbuild-plugin-clean";
var BuildTask = class {
  constructor(taskName, clientRoot, assetRoot, entry) {
    this.taskName = taskName;
    this.clientRoot = clientRoot;
    this.assetRoot = assetRoot;
    this.entry = entry;
    this.Configure(entry);
  }
  options = null;
  GetTaskName() {
    return this.taskName;
  }
  async RunTask() {
    this.PrintTaskName();
    try {
      await this.Execute();
      this.PrintDone();
    } catch (error) {
      console.log(error);
      this.PrintError();
    }
  }
  async Execute() {
    if (this.options === null) {
      throw new Error("No options specified");
    }
    await esbuild.build(this.options);
  }
  Configure(entry) {
    this.options = {
      bundle: this.GetBundle(),
      ...this.ResolveEntryPoints(entry.entryPoints),
      ...this.getMinifyAndSourMapOptions(),
      ...this.ResolveOutDir(entry.outDir),
      ...this.ResolveOutFile(entry.outFile),
      ...this.AddPlugins(entry.plugins, entry.cleanPatterns)
    };
  }
  PrintTaskName() {
    console.log(color("white", "[  ]") + " " + color("green", `Running Task: ${this.GetTaskName()}...`) + "\n");
  }
  PrintDone() {
    console.log(
      "\n" + bold(color("white", "[\u2714]") + " " + color("green", `${this.GetTaskName()} finished successfully!`)) + "\n"
    );
  }
  PrintError() {
    console.log(
      "\n" + bold(color("white", "[X]") + " " + color("red", `${this.GetTaskName()} finished with an error!`)) + "\n"
    );
  }
  getMinifyAndSourMapOptions() {
    return {
      minify: !isDev(),
      sourcemap: isDev()
    };
  }
  ResolveEntryPoints(entries) {
    return entries ? { entryPoints: entries.map((entry) => path.resolve(this.clientRoot, entry)) } : void 0;
  }
  ResolveOutDir(outDir) {
    return outDir ? { outdir: path.resolve(this.assetRoot, outDir) } : void 0;
  }
  ResolveOutFile(outFile) {
    return outFile ? { outfile: path.resolve(this.assetRoot, outFile) } : void 0;
  }
  AddPlugins(plugins, cleanPatterns) {
    const outPlugins = plugins ?? [];
    if (cleanPatterns) {
      outPlugins.push(clean({ patterns: cleanPatterns.map((pattern) => path.resolve(this.assetRoot, pattern)) }));
    }
    return {
      plugins: outPlugins
    };
  }
  GetBundle() {
    return !!this.entry.outFile;
  }
};

// src/process/build-scss.ts
import { sassPlugin } from "esbuild-sass-plugin";
var build_scss_default = class extends BuildTask {
  Configure(entry) {
    super.Configure(entry);
    if (this.options === null) {
      throw new Error("Error: Options must be set!");
    }
    this.options.loader = {
      ".eot": "file",
      ".ttf": "file",
      ".png": "file",
      ".jpg": "file",
      ".webp": "file",
      ".woff": "file",
      ".woff2": "file",
      ".svg": "file"
    };
    this.options.assetNames = "[dir]/[name]";
    this.options.plugins?.push(sassPlugin());
  }
};

// src/process/copy-files.ts
import copy from "esbuild-copy-files-plugin";
import path2 from "path";
var copy_files_default = class extends BuildTask {
  Configure(entry) {
    if (entry.outDir === void 0) {
      throw new Error("outDir must be provided to copy files plugin");
    }
    this.options = {
      plugins: [
        copy({
          source: entry.entryPoints.map((file) => path2.resolve(this.clientRoot, file)),
          target: path2.resolve(this.assetRoot, entry.outDir),
          copyWithFolder: false
        })
      ]
    };
  }
};

// src/process/typescript.ts
import * as esbuild2 from "esbuild";
import path3 from "path";
import { exec } from "node:child_process";
var typescript_default = class extends BuildTask {
  Configure(entry) {
    if (entry.tsconfigPath === void 0) {
      throw new Error("Missing tsconfig path for task.");
    }
    this.tsconfigPath = path3.resolve(this.clientRoot, entry.tsconfigPath);
    this.options = {
      ...this.AddPlugins(entry.plugins, entry.cleanPatterns)
    };
  }
  async Execute() {
    const path4 = this.tsconfigPath;
    if (this.options?.plugins?.length) {
      await esbuild2.build(this.options);
    }
    return new Promise((resolve5, reject) => {
      exec(`./node_modules/.bin/tsc --project ${path4}`, (error, stdout, stderr) => {
        console.log(stdout);
        if (error === null) {
          resolve5();
        }
        console.log(stderr);
        reject(error);
      });
    });
  }
};

// src/util/get-task.ts
var tasks = {
  build: BuildTask,
  scss: build_scss_default,
  "copy-files": copy_files_default,
  typescript: typescript_default
};
function getTask(task) {
  return tasks[task];
}

// src/util/get-build-tasks.ts
function getBuildTasks(config) {
  return config.buildTasks.map((buildTask) => {
    const TaskClass = getTask(buildTask.task);
    if (!TaskClass) {
      throw new Error(`Unknown build task: ${buildTask.task}`);
    }
    return new TaskClass(buildTask.name, config.clientRoot, config.assetRoot, buildTask.entry);
  });
}

// src/process/build-all.ts
async function buildAll(config) {
  const tasks2 = getBuildTasks(config);
  await Promise.all(tasks2.map((task) => task.RunTask()));
}

// src/index.ts
import { watch } from "fs/promises";

// src/util/is-watching.ts
function isWatching() {
  return process.argv.some((arg) => arg.startsWith("watch"));
}

// src/util/get-config.ts
import { resolve } from "path";
import { existsSync } from "fs";

// src/util/get-config-file-names.ts
function getConfigFileNames() {
  return ["simple-build.config.js", "simple-build.config.cjs", "simple-build.config.mjs"];
}

// src/util/get-config.ts
async function getConfig() {
  const configFileNames2 = getConfigFileNames();
  const curDir = process.cwd();
  for (let i = 0; i < configFileNames2.length; i++) {
    const configFilePath = resolve(curDir, configFileNames2[i]);
    if (existsSync(configFilePath)) {
      const configModule = await import(configFilePath);
      return configModule.default || configModule;
    }
  }
  return {
    clientRoot: resolve(curDir, "./client"),
    assetRoot: resolve(curDir + "./assets"),
    buildTasks: []
  };
}

// src/util/is-server-mode.ts
function isServerMode() {
  return process.argv.some((arg) => arg.startsWith("serve"));
}

// src/server/express.ts
import express from "express";
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { dirname as dirname2, resolve as resolve4 } from "node:path";

// src/server/routes/version.ts
import { readFileSync } from "fs";
import { resolve as resolve2 } from "path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
var versionRoute = (app) => {
  app.get("/api/version", (_req, res) => {
    const __filename2 = fileURLToPath(import.meta.url);
    const __dirname2 = dirname(__filename2);
    const packageFile = readFileSync(resolve2(__dirname2, "../package.json"), "utf-8");
    const packageJson = JSON.parse(packageFile);
    const version = packageJson.version || "1.0.0";
    const response = {
      version
    };
    res.json(response);
  });
};

// src/server/routes/config-files.ts
import { promises as fs } from "fs";
import { resolve as resolve3, relative } from "path";
var configFileNames = getConfigFileNames();
async function findConfigFiles(dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve3(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".git", ".cache", "var", "cache", "public"].includes(entry.name)) continue;
      await findConfigFiles(fullPath, results);
    } else if (entry.isFile() && configFileNames.includes(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}
var configFilesRoute = (app) => {
  app.get("/api/config-files", async (_req, res) => {
    try {
      const root = process.cwd();
      const foundFiles = await findConfigFiles(root);
      const files = [];
      for (const absPath of foundFiles) {
        const content = await fs.readFile(absPath, "utf-8");
        const relPath = "/" + relative(root, absPath);
        files.push({ filePath: relPath, fileContents: content });
      }
      const response = { files };
      res.json(response);
    } catch (err) {
      console.error("Error scanning config files:", err);
      res.status(500).json({ error: "Failed to scan config files" });
    }
  });
};

// src/server/express.ts
var __filename = fileURLToPath2(import.meta.url);
var __dirname = dirname2(__filename);
function startExpressServer() {
  const app = express();
  const port = 3333;
  const publicDir = resolve4(__dirname, "../public");
  app.use(express.static(publicDir));
  versionRoute(app);
  configFilesRoute(app);
  app.listen(port, () => {
    console.log(`Simple-Build Listening on port ${port}`);
  });
}

// src/index.ts
async function build3(config) {
  await buildAll(config);
  if (isWatching()) {
    let timeout = null;
    const watcher = watch(config.clientRoot, { recursive: true });
    console.log(bold(color("yellow", "--- Watching for changes ---")) + "\n");
    for await (const _event of watcher) {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(async () => {
        console.clear();
        console.log(bold(color("yellow", "--- Rebuilding... ---")) + "\n\n");
        await buildAll(config);
        console.log(bold(color("yellow", "--- Watching for changes ---")) + "\n");
      }, 500);
    }
  }
}
if (isServerMode()) {
  startExpressServer();
} else {
  await build3(await getConfig());
}
