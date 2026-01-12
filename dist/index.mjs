#!/usr/bin/env node
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

// src/process/build-task.ts
import * as esbuild from "esbuild";

// src/util/is-dev.ts
import "dotenv/config";
function isDev() {
  return process.env.APP_ENV === "dev";
}

// src/process/build-task.ts
import path from "path";
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
      "\n" + bold(color("white", "[\u2714\uFE0F]") + " " + color("green", `${this.GetTaskName()} finished successfully!`)) + "\n"
    );
  }
  PrintError() {
    console.log(
      "\n" + bold(color("white", "[\u274C]") + " " + color("red", `${this.GetTaskName()} finished with an error!`)) + "\n"
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
import path3 from "path";
import { exec } from "node:child_process";
import * as esbuild2 from "esbuild";
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
    return new Promise((resolve2, reject) => {
      exec(`./node_modules/.bin/tsc --project ${path4}`, (error, stdout, stderr) => {
        console.log(stdout);
        if (error === null) {
          resolve2();
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
async function getConfig() {
  const configFileNames = ["simple-build.config.js", "simple-build.config.cjs", "simple-build.config.mjs"];
  const curDir = process.cwd();
  for (let i = 0; i < configFileNames.length; i++) {
    const configFilePath = resolve(curDir, configFileNames[i]);
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
await build3(await getConfig());
