#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import process from "node:process";
import assert from "node:assert/strict";

const args = process.argv.slice(2);
const root = process.cwd();
const configArg = args.indexOf("--config");
const configPath = configArg >= 0 ? args[configArg + 1] : "config/ai-architecture-policy.json";
const baseArg = args.indexOf("--base");
const baseSha = baseArg >= 0 ? args[baseArg + 1] : process.env.BASE_SHA;
const ignoredDirectories = new Set([".git", "node_modules", ".next", ".nuxt", ".svelte-kit", ".astro", "dist", "build", "coverage", ".cache", "vendor"]);

function posix(path) {
  return path.split(sep).join("/").replace(/^\.\//, "");
}

function globToRegex(glob) {
  const input = posix(glob);
  let output = "^";
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (char === "*" && input[index + 1] === "*") {
      index += 1;
      if (input[index + 1] === "/") {
        index += 1;
        output += "(?:.*/)?";
      } else {
        output += ".*";
      }
    } else if (char === "*") {
      output += "[^/]*";
    } else if (char === "?") {
      output += "[^/]";
    } else {
      output += char.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
    }
  }
  return new RegExp(`${output}$`);
}

function matches(path, patterns = []) {
  return patterns.some((pattern) => {
    const normalized = posix(pattern).replace(/\/$/, "");
    return posix(path) === normalized || posix(path).startsWith(`${normalized}/`) || globToRegex(normalized).test(posix(path));
  });
}

function walk(directory = ".") {
  return readdirSync(resolve(root, directory)).sort().flatMap((entry) => {
    if (ignoredDirectories.has(entry)) return [];
    const absolute = resolve(root, directory, entry);
    const path = posix(relative(root, absolute));
    return statSync(absolute).isDirectory() ? walk(path) : [path];
  });
}

function read(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function dependencyContractChanged(manifest, base) {
  if (!manifest.endsWith("package.json")) return true;
  try {
    const before = JSON.parse(git(["show", `${base}:${manifest}`]));
    const after = JSON.parse(read(manifest));
    const keys = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies", "overrides", "resolutions", "packageManager"];
    return keys.some((key) => JSON.stringify(before[key] ?? null) !== JSON.stringify(after[key] ?? null));
  } catch {
    return true;
  }
}

function selfTest() {
  assert.equal(globToRegex("src/**/*.css").test("src/styles/base.css"), true);
  assert.equal(globToRegex("src/**/*.css").test("src/base.ts"), false);
  assert.equal(matches("src/styles/base.css", ["src/styles"]), true);
  assert.equal(matches("content/post.md", ["content/**"]), true);
  assert.equal(/(?:^|[;{\s])overflow-y\s*:\s*(?:auto|scroll)\b/i.test(".x { overflow-y: auto; }"), true);
  assert.equal(/(?:^|[;{\s])height\s*:\s*(?:100vh|100dvh|100svh|100lvh)\b/i.test(".x { min-height: 100vh; }"), false);
  assert.equal(/addEventListener\s*\(\s*["'](?:wheel|touchmove)["']/m.test("x.addEventListener('wheel', fn)"), true);
  console.log("AI architecture guard self-test passed.");
}

if (args.includes("--self-test")) {
  selfTest();
  process.exit(0);
}

if (!existsSync(resolve(root, configPath))) {
  console.error(`Missing ${configPath}. Copy and configure the policy before enforcement.`);
  process.exit(1);
}

const policy = JSON.parse(read(configPath));
const enforce = policy.mode === "enforce";
const findings = [];
const notes = [];

function report(path, message) {
  findings.push(`${path}: ${message}`);
}

function note(message) {
  notes.push(message);
}

if (policy.schemaVersion !== 1) report(configPath, "unsupported schemaVersion; expected 1");
if (!["audit", "enforce"].includes(policy.mode)) report(configPath, "mode must be audit or enforce");
if (!policy.sourceRoots?.length) note("sourceRoots is empty; configure it during adoption");
if (!policy.allowedStyleRoots?.length) note("allowedStyleRoots is empty; style placement is not yet constrained");
if (!policy.requiredPaths?.length) note("requiredPaths is empty; architecture anchors are not yet protected");

for (const path of policy.requiredPaths ?? []) {
  if (!existsSync(resolve(root, path))) report(path, "required architecture anchor is missing");
}

const files = walk();
const styleExtensions = new Set(policy.styleFileExtensions ?? []);
const markupExtensions = new Set(policy.markupFileExtensions ?? []);
const scriptExtensions = new Set(policy.scriptFileExtensions ?? []);
const styleFiles = files.filter((path) => styleExtensions.has(extname(path)));
const markupFiles = files.filter((path) => markupExtensions.has(extname(path)));
const scriptFiles = files.filter((path) => scriptExtensions.has(extname(path)));

if (policy.allowedStyleRoots?.length) {
  for (const path of styleFiles) {
    if (!matches(path, policy.allowedStyleRoots)) report(path, "style file is outside allowedStyleRoots");
  }
}

for (const entry of policy.styleEntryPoints ?? []) {
  if (!existsSync(resolve(root, entry.file))) {
    report(entry.file, "configured style entry point is missing");
    continue;
  }
  const source = read(entry.file);
  let previous = -1;
  for (const importText of entry.orderedImports ?? []) {
    const count = source.split(importText).length - 1;
    const index = source.indexOf(importText);
    if (count !== 1) report(entry.file, `${importText} must appear exactly once; found ${count}`);
    if (index <= previous) report(entry.file, `${importText} is missing or out of configured order`);
    previous = index;
  }
}

const rawColorPattern = /#[0-9a-f]{3,8}\b|(?:rgb|hsl|hwb|oklch|oklab|lab|lch)a?\s*\(/i;
const keyframeOwners = new Map();

for (const path of styleFiles) {
  const source = read(path);
  const lines = source.split(/\r?\n/);

  if (!matches(path, [...(policy.tokenFiles ?? []), ...(policy.rawColorAllowlist ?? [])])) {
    lines.forEach((line, index) => {
      if (rawColorPattern.test(line) && !/var\s*\(/i.test(line)) report(`${path}:${index + 1}`, "raw color is outside configured token/allowlist files");
    });
  }

  lines.forEach((line, index) => {
    if (/(?:^|[;{\s])overflow-y\s*:\s*(?:auto|scroll)\b/i.test(line) && !matches(path, policy.nestedVerticalScrollAllowlist ?? [])) {
      report(`${path}:${index + 1}`, "nested vertical scrolling is not allowlisted");
    }
    if (/(?:^|[;{\s])height\s*:\s*(?:100vh|100dvh|100svh|100lvh)\b/i.test(line) && !matches(path, policy.fixedViewportHeightAllowlist ?? [])) {
      report(`${path}:${index + 1}`, "fixed viewport height may clip zoomed/short-viewport content");
    }
  });

  const importantCount = (source.match(/!important\b/gi) ?? []).length;
  const ceiling = policy.importantCeilings?.[path];
  if (importantCount > 0 && ceiling === undefined) report(path, `${importantCount} !important declarations have no grandfathered ceiling`);
  if (ceiling !== undefined && importantCount > ceiling) report(path, `${importantCount} !important declarations exceed ceiling ${ceiling}`);

  for (const match of source.matchAll(/@(?:-\w+-)?keyframes\s+([\w-]+)/gi)) {
    const name = match[1];
    const owner = keyframeOwners.get(name);
    if (owner && owner !== path) report(path, `keyframe ${name} duplicates definition in ${owner}`);
    else keyframeOwners.set(name, path);
  }
}

for (const path of markupFiles) {
  const source = read(path);
  if (/<style(?:\s|>)/i.test(source) && !matches(path, policy.localStyleBlockAllowlist ?? [])) {
    report(path, "local <style> block is not allowlisted; use the configured style owner");
  }
}

for (const path of scriptFiles) {
  if (matches(path, policy.globalScrollInterceptionAllowlist ?? [])) continue;
  const source = read(path);
  if (/addEventListener\s*\(\s*["'](?:wheel|touchmove)["']/m.test(source) || /\.onwheel\s*=/m.test(source)) {
    report(path, "global wheel/touch interception is not allowlisted");
  }
  if (/(?:document\.body|document\.documentElement)\.style\.overflow(?:Y)?\s*=/m.test(source)) {
    report(path, "document/body overflow locking is not allowlisted");
  }
}

if (baseSha) {
  try {
    const diff = git(["diff", "--name-status", "-M", `${baseSha}...HEAD`]);
    const entries = diff ? diff.split(/\r?\n/).map((line) => line.split("\t")) : [];
    const changed = entries.map((parts) => parts.at(-1));
    if (changed.length > (policy.maxChangedFiles ?? 40)) report("git diff", `${changed.length} files exceed maxChangedFiles ${policy.maxChangedFiles ?? 40}`);

    for (const parts of entries) {
      const status = parts[0];
      const oldPath = parts.length > 2 ? parts[1] : parts[1];
      if ((status.startsWith("D") || status.startsWith("R")) && matches(oldPath, policy.protectedPathGlobs ?? [])) {
        report(oldPath, `protected path was ${status.startsWith("R") ? "renamed" : "deleted"}`);
      }
    }

    if (policy.forbidMixedContentAndCode) {
      const contentChanged = changed.some((path) => matches(path, policy.contentPathGlobs ?? []));
      const codeChanged = changed.some((path) => matches(path, policy.codePathGlobs ?? []));
      if (contentChanged && codeChanged) report("git diff", "content and code changed together despite forbidMixedContentAndCode");
    }

    if (policy.allowNewTopLevelDirectories === false) {
      const baseDirectories = new Set(git(["ls-tree", "-d", "--name-only", baseSha]).split(/\r?\n/).filter(Boolean));
      const currentDirectories = readdirSync(root).filter((entry) => !ignoredDirectories.has(entry) && statSync(resolve(root, entry)).isDirectory());
      for (const directory of currentDirectories) {
        if (!baseDirectories.has(directory) && !matches(directory, policy.newTopLevelDirectoryAllowlist ?? [])) {
          report(directory, "new top-level directory requires explicit architecture approval");
        }
      }
    }

    for (const [manifest, lockfile] of policy.dependencyLockPairs ?? []) {
      if (changed.includes(manifest) && dependencyContractChanged(manifest, baseSha) && existsSync(resolve(root, lockfile)) && !changed.includes(lockfile)) {
        report(manifest, `changed without existing lockfile ${lockfile}`);
      }
    }
  } catch (error) {
    report("git diff", `could not compare with base ${baseSha}: ${error.message}`);
  }
} else {
  note("No BASE_SHA/--base supplied; diff scope, protected deletion, and new top-level-directory checks were skipped");
}

for (const message of notes) console.warn(`NOTE: ${message}`);

if (findings.length) {
  const heading = enforce ? "AI architecture guard failed" : "AI architecture audit findings";
  console.error(`\n${heading}:\n`);
  for (const finding of findings) console.error(`- ${finding}`);
  console.error("\nFix the authoritative owner or document a narrow evidence-backed exception. Do not add a broad allowlist.");
  process.exit(enforce ? 1 : 0);
}

console.log(`AI architecture guard passed in ${policy.mode} mode (${files.length} files checked).`);
