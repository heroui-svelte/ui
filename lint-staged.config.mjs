import fs from "fs";
import {dirname, relative, resolve} from "path";

import {ESLint} from "eslint";

const projectRoot = process.cwd();
const GENERATED_PATH_SEGMENTS = [
  "/.svelte-kit/",
  "/.next/",
  "/.turbo/",
  "/coverage/",
  "/dist/",
  "/build/",
  "/storybook-static/",
  "/node_modules/",
  "/package/",
];
const LEGACY_PATH_PREFIXES = [
  "apps/docs-legacy-react/",
  "packages/react-legacy/",
  "packages/storybook-legacy/",
];
const ACTIVE_WORKSPACE_PATH_PREFIXES = [
  "apps/docs/",
  "packages/standard/",
  "packages/styles/",
  "packages/ui/",
  "packages/vitest/",
];
const ROOT_FILE_ALLOWLIST = new Set([
  "commitlint.config.mjs",
  "eslint.config.mjs",
  "lint-staged.config.mjs",
  "package.json",
  "pnpm-workspace.yaml",
  "turbo.json",
]);
const ESLINT_CHUNK_SIZE = 40;
const PRETTIER_CHUNK_SIZE = 80;

// Eslint mode: "Experimental" | "Legacy"
const LINT_MODE = "Experimental";

const chunk = (items, size) => {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

const normalizeFilePath = (file) => relative(projectRoot, file).replaceAll("\\", "/");

const shouldProcessFile = (file) => {
  const normalizedFile = normalizeFilePath(file);

  if (LEGACY_PATH_PREFIXES.some((prefix) => normalizedFile.startsWith(prefix))) {
    return false;
  }

  if (GENERATED_PATH_SEGMENTS.some((segment) => normalizedFile.includes(segment.slice(1)))) {
    return false;
  }

  if (ROOT_FILE_ALLOWLIST.has(normalizedFile)) {
    return true;
  }

  return ACTIVE_WORKSPACE_PATH_PREFIXES.some((prefix) => normalizedFile.startsWith(prefix));
};

const filterFilesForHook = (files) => files.filter((file) => shouldProcessFile(file));

const removeIgnoredFilesNew = async (files) => {
  try {
    const eslint = new ESLint();
    const cwd = process.cwd();

    const relativePaths = files.map((file) => relative(cwd, file));
    const isIgnored = await Promise.all(relativePaths.map((file) => eslint.isPathIgnored(file)));

    return files.filter((_, i) => !isIgnored[i]).join(" ");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
};

function findPackageRoot(file) {
  let dir = dirname(file);

  while (dir !== "/") {
    if (fs.existsSync(`${dir}/package.json`)) return dir;
    const parentDir = dirname(dir);

    if (parentDir === dir) break;
    dir = parentDir;
  }

  return projectRoot;
}

async function removeIgnoredFilesLegacy(files, eslint) {
  const isIgnored = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));

  return files.filter((_, i) => !isIgnored[i]);
}

const lintStaged = {
  "**/*.{cjs,mjs,js,ts,jsx,tsx}": async (files) => {
    const eligibleFiles = filterFilesForHook(files);

    if (!eligibleFiles.length) {
      return [];
    }

    if (LINT_MODE === "Experimental") {
      // use ESLint with experimental configuration file resolution
      const filesToLint = await removeIgnoredFilesNew(eligibleFiles);

      if (!filesToLint.trim()) {
        return [];
      }

      return chunk(filesToLint.split(" "), ESLINT_CHUNK_SIZE).map(
        (group) =>
          `eslint --flag v10_config_lookup_from_file --no-warn-ignored --fix ${group.join(" ")}`,
      );
    }

    if (LINT_MODE === "Legacy") {
      // Legacy with group files by package root and resolve ESLint config
      const filesByPackage = new Map();

      for (const file of eligibleFiles) {
        const pkgRoot = findPackageRoot(file);

        if (!filesByPackage.has(pkgRoot)) filesByPackage.set(pkgRoot, []);
        filesByPackage.get(pkgRoot).push(file);
      }

      const commands = [];

      for (const [pkgRoot, pkgFiles] of filesByPackage.entries()) {
        // Check if the package has its own eslint.config.mjs
        const configPath = fs.existsSync(resolve(pkgRoot, "eslint.config.mjs"))
          ? resolve(pkgRoot, "eslint.config.mjs")
          : resolve(projectRoot, "eslint.config.mjs");

        const eslint = new ESLint({cwd: pkgRoot, overrideConfigFile: configPath});
        const filesToLint = await removeIgnoredFilesLegacy(pkgFiles, eslint);

        if (filesToLint.length) {
          for (const group of chunk(filesToLint, ESLINT_CHUNK_SIZE)) {
            commands.push(`eslint --config ${configPath} --fix ${group.join(" ")}`);
          }
        }
      }

      return commands;
    }

    return [];
  },

  "**/*.{html,css,scss,json,jsonc,md,mdx}": async (files) => {
    const eligibleFiles = filterFilesForHook(files);

    if (!eligibleFiles.length) {
      return [];
    }

    return chunk(eligibleFiles, PRETTIER_CHUNK_SIZE).map(
      (group) => `prettier --ignore-path .prettierignore --write ${group.join(" ")}`,
    );
  },
};

export default lintStaged;
