# simple-build

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/2forWeb/simple-build)
[![Lint](https://github.com/2forWeb/simple-build/actions/workflows/lint.yaml/badge.svg)](https://github.com/2forWeb/simple-build/actions/workflows/lint.yaml)
[![Build](https://github.com/2forWeb/simple-build/actions/workflows/build.yaml/badge.svg)](https://github.com/2forWeb/simple-build/actions/workflows/build.yaml)
[![Tests](https://github.com/2forWeb/simple-build/actions/workflows/tests.yaml/badge.svg)](https://github.com/2forWeb/simple-build/actions/workflows/tests.yaml)

Simple build system taking on ESBuild and standardizing a few things.

## Summary

The objective of this project is to provide a simple abstraction on top pf
esbuild to provide a few standard configurations that can be used to build
the front end aspect of symfony or similar web applications.

While this was created with symfony and asset mapper in mind, it can be used
in other environments.

## Basics and examples

### Source and outputs

The system is based on the concept of a source client folder and an output
folder where the files will be placed.

With the intention not to pollute the `./assets` folder for asset mapper,
the system uses the `./client` folder as the default source folder for files like
scss and TypeScript files.

All paths you provide later to the different build tasks will be relative
to these client and assets folders. But you can circumvent this by
providing relative paths, such as `../public/static/js/out.js`. This will
be calculated from `./assets` and will correctly point to the project's
`./public` folder.

### Environment

The system uses the `APP_ENV` environment variable to determine the
presence or absence of source maps. This can be configured in `.env` or
`.env.local` files or as environment variables.

### Watch

If you pass the parameter `watch` to your build script, the system will
automatically watch for changes in the client folder.

### Serve

If you pass the `serve` parameter to your build script, it will launch an
express server with a GUI to view, tweak and create build option files.

### Example build file

Write a js build file on the root of your application like this:

```javascript
export default {
    clientRoot: './client', // relative to the path you call the build command from
    assetRoot: './assets',
    buildTasks: [
        {
            name: 'TypeScript Controllers',
            task: 'typescript',
            entry: {
                tsconfigPath: ['./controllers/tsconfig.json'],
            },
        },
        {
            name: 'Sass',
            task: 'scss',
            entry: {
                entryPoints: ['./styles/app.scss'],
                outFile: 'app.css',
            },
        },
    ],
};
```

This will use `tsc` to typecheck and build the TypeScript files in the
`./client/controllers` folder as specified by your `tsconfig.json` file
and `sass` to build the `./client/styles/app.scss` and place it under
`./assets/app.css`, ready for Asset Mapper to pick it up.

The next step would be to add these scripts to your `package.json` file:

```json
{
    "scripts": {
        "build": "node ./node_modules/.bin/simple-build",
        "build:serve": "node ./node_modules/.bin/simple-build serve",
        "build:watch": "node ./node_modules/.bin/simple-build watch"
    }
}
```

## Tasks

### `build`

Generic esbuild build task using entry points and an `outDir` or `outFile`
parameters. This will determine weather to bundle or to place all the files
in the directory specified.

### `scss`

A build task designed to build scss files.

### `copy-files`

This will use the `copy-files-plugin` to copy different assets to
the `./assets` folder.

### `typescript`

A build task designed to build TypeScript files using a `tsconfig.json` 
configuration file.

## Entry

The entry (as a property in the `buildTasks` array) is the simplified
esbuild configuration object. An esbuild config object will be
created from this with all paths resolved to their client or assets
directories.

### entryPoints

An array of entry points to be built.

### outFile

The file to be created. If this is set the `bundle` property will be
set to `true`.

### outDir

The directory to place the files in. If this is set the `bundle` property
will be set to `false` and all files listed in the entry points will be
converted one by one.

### tsconfigPath

For the `BuildTypeScript` task, this is the path to the `tsconfig.json`
that will be used to build the files. This is also useful to perform
type checking or creating a set of definition files.

### cleanPatterns

An array of glob patterns to clean before building. If this is passed,
the `clean-files-plugin` will be used to clean the files before building.

### plugins

An array of additional esbuild plugins to run on the build task. These
can be useful for example, to resolve external fonts or image paths
in a scss file.
