import type {DocsBlock, DocsDocSummary, DocsNavSection, DocsPage} from "$lib/docs/types";

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import {marked} from "marked";

marked.setOptions({gfm: true});

type DocRecord = DocsDocSummary & {
  groupLabel?: string;
  sourcePath: string;
};

type DemoRecord = {
  fileName: string;
  name: string;
  sourcePath: string;
};

const docsRoot = path.resolve(process.cwd(), "../docs-legacy-react/content/docs/react");
const demosRoot = path.resolve(process.cwd(), "../docs-legacy-react/src/demos");
const tokenPattern = /\[\[DOC_TOKEN_(\d+)\]\]/;

let docsCache: DocRecord[] | undefined;
let demoCache: Map<string, DemoRecord> | undefined;
let linkTargetsCache: string[] | undefined;

const hiddenPathFragments = ["/migration/", "/(ui-for-agents)/"];
const hiddenLeadingSegments = ["migration"];
const textReplacements: Array<[RegExp, string]> = [
  [/@heroui\/react/g, "@heroui-svelte/ui"],
  [/@heroui\/styles/g, "@heroui-svelte/styles"],
  [/\/docs\/react\//g, "/docs/"],
  [/\/docs\/handbook\//g, "/docs/getting-started/"],
  [/\/docs\/native\/[A-Za-z0-9-_/]+/g, "/docs/getting-started"],
  [/\/docs\/migration\/[A-Za-z0-9-_/]+/g, "/docs/getting-started"],
  [/\/docs\/migration\b/g, "/docs/getting-started"],
  [/\/docs\/ui-for-agents\/[A-Za-z0-9-_/]+/g, "/docs/getting-started"],
  [/\/docs\/components\/textarea\b/g, "/docs/components/text-area"],
  [/\/docs\/components\/listbox\b/g, "/docs/components/list-box"],
  [/\/docs\/components\/combobox\b/g, "/docs/components/combo-box"],
  [/\/docs\/components\/inputotp\b/g, "/docs/components/input-otp"],
  [/\/docs\/compoenents\//g, "/docs/components/"],
  [/\/home\b/g, "/docs"],
  [/\/themes\b/g, "/docs/getting-started/theming"],
  [/HeroUI v3/g, "heroui-svelte"],
  [/HeroUI/g, "heroui-svelte"],
  [/React 19\+/g, "Svelte 5+"],
];

const toTitleCase = (value: string) =>
  value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

const humanize = (value: string) => toTitleCase(value.replace(/[()]/g, "").replace(/-/g, " "));
const stripGroupingSegment = (segment: string) =>
  segment.startsWith("(") && segment.endsWith(")") ? "" : segment;
const normalizeComponentName = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const applyTextReplacements = (value: string) =>
  textReplacements.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    value,
  );

const shouldExcludePath = (relativePath: string) =>
  hiddenLeadingSegments.some((segment) => relativePath.startsWith(`${segment}/`)) ||
  hiddenPathFragments.some((fragment) => relativePath.includes(fragment));

async function walkFiles(root: string, extension: string) {
  const files: string[] = [];

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, {withFileTypes: true});

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && fullPath.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  }

  await walk(root);

  return files;
}

async function loadDocsIndex() {
  if (docsCache) {
    return docsCache;
  }

  const files = await walkFiles(docsRoot, ".mdx");
  const docs: DocRecord[] = [];

  for (const sourcePath of files) {
    const relativePath = path.relative(docsRoot, sourcePath).split(path.sep).join("/");

    if (shouldExcludePath(relativePath)) {
      continue;
    }

    const fileContents = await fs.readFile(sourcePath, "utf8");
    const {data} = matter(fileContents);
    const relativeWithoutExt = relativePath.replace(/\.mdx$/, "");
    const rawSegments = relativeWithoutExt.split("/");
    const slug = rawSegments
      .map(stripGroupingSegment)
      .filter(Boolean)
      .filter((segment) => segment !== "index");
    const groupSegment = rawSegments.find(
      (segment) => segment.startsWith("(") && segment.endsWith(")"),
    );
    const section = slug[0] ?? "docs";
    const href = `/docs/${slug.join("/")}`;

    docs.push({
      description: applyTextReplacements(String(data.description ?? "")) || undefined,
      group: groupSegment?.slice(1, -1),
      groupLabel: groupSegment ? humanize(groupSegment) : undefined,
      href,
      section,
      slug,
      sourcePath,
      title: applyTextReplacements(String(data.title ?? humanize(slug.at(-1) ?? section))),
    });
  }

  docs.sort((left, right) => left.href.localeCompare(right.href));
  docsCache = docs;

  return docs;
}

async function loadInternalDocLinks() {
  if (linkTargetsCache) {
    return linkTargetsCache;
  }

  const files = await walkFiles(docsRoot, ".mdx");
  const targets = new Set<string>();

  for (const sourcePath of files) {
    const text = applyTextReplacements(await fs.readFile(sourcePath, "utf8"));

    for (const match of text.matchAll(/\((\/docs\/[^)#\s]+)\)/g)) {
      targets.add(match[1]);
    }

    for (const match of text.matchAll(/href="(\/docs\/[^"#\s]+)"/g)) {
      targets.add(match[1]);
    }
  }

  linkTargetsCache = [...targets];

  return linkTargetsCache;
}

async function loadDemoIndex() {
  if (demoCache) {
    return demoCache;
  }

  const files = await walkFiles(demosRoot, ".tsx");
  const registry = new Map<string, DemoRecord>();

  for (const sourcePath of files) {
    const fileName = path.basename(sourcePath, path.extname(sourcePath));

    if (fileName === "index") {
      continue;
    }

    const relativePath = path.relative(demosRoot, sourcePath).split(path.sep).join("/");
    const segments = relativePath.replace(/\.tsx$/, "").split("/");
    const folder = segments.slice(0, -1).join("-");
    const name = [folder, fileName].filter(Boolean).join("-");

    registry.set(name, {
      fileName,
      name,
      sourcePath,
    });
  }

  demoCache = registry;

  return registry;
}

async function renderMarkdown(markdown: string) {
  const prepared = applyTextReplacements(markdown).replace(/<br\s*\/>/g, "<br />");
  const html = String(await marked.parse(prepared));

  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (_, level, text) => {
    const id = slugify(text);

    return id ? `<h${level} id="${id}">${text}</h${level}>` : `<h${level}>${text}</h${level}>`;
  });
}

function convertDemoSource(source: string) {
  const transformed = applyTextReplacements(
    source
      .replace(/^"use client";\s*/m, "")
      .replace(/^import React.*$/gm, "")
      .replace(/^import type React.*$/gm, "")
      .trim(),
  );
  const extractedMarkup =
    transformed.match(
      /export default function \w+\([^)]*\)\s*\{\s*return\s*\(([\s\S]*?)\);\s*\}$/m,
    )?.[1] ??
    transformed.match(
      /function \w+\([^)]*\)\s*\{\s*return\s*\(([\s\S]*?)\);\s*\}\s*export default \w+;?/m,
    )?.[1] ??
    transformed.match(
      /const \w+\s*=\s*\([^)]*\)\s*=>\s*\(([\s\S]*?)\);\s*export default \w+;?/m,
    )?.[1];

  if (!extractedMarkup) {
    return {
      converted: false,
      language: "tsx",
      source: transformed,
    };
  }

  const svelteLike = extractedMarkup
    .replace(/className=/g, "class=")
    .replace(/onPress=/g, "onclick=")
    .replace(/<>\s*/g, "")
    .replace(/\s*<\/>/g, "")
    .trim();

  return {
    converted: true,
    language: "svelte",
    source: svelteLike,
  };
}

async function getDemoPreview(name: string) {
  const demos = await loadDemoIndex();
  const record = demos.get(name);

  if (!record) {
    return {
      converted: false,
      language: "svelte",
      source: `<div class="demo-missing">${name}</div>`,
      title: humanize(name.replace(/^[^-]+-/, "")),
    };
  }

  const source = await fs.readFile(record.sourcePath, "utf8");
  const converted = convertDemoSource(source);

  return {
    ...converted,
    title: humanize(record.fileName),
  };
}

function createToken(blocks: DocsBlock[], block: DocsBlock) {
  const index = blocks.push(block) - 1;

  return `\n\n[[DOC_TOKEN_${index}]]\n\n`;
}

async function buildBlocks(body: string, currentDoc: DocRecord, allDocs: DocRecord[]) {
  const demoRegistry = await loadDemoIndex();
  const blocks: DocsBlock[] = [];
  let transformed = applyTextReplacements(body);

  transformed = transformed.replace(
    /<CollapsibleCode[^>]*lang="([^"]+)"[^>]*code=\{`([\s\S]*?)`\}\s*\/>/g,
    (_, language, code) =>
      `\n\n\`\`\`${language}\n${applyTextReplacements(code).trim()}\n\`\`\`\n\n`,
  );

  transformed = transformed.replace(
    /<DocsImage[^>]*src="([^"]+)"[\s\S]*?alt="([^"]+)"(?:[\s\S]*?href="([^"]+)")?[\s\S]*?\/>/g,
    (_, src, alt, href) =>
      href
        ? `\n\n<a href="${applyTextReplacements(href)}"><img src="${src}" alt="${alt}" /></a>\n\n`
        : `\n\n<img src="${src}" alt="${alt}" />\n\n`,
  );

  transformed = transformed.replace(
    /<VideoPlayer[^>]*src="([^"]+)"(?:[\s\S]*?poster="([^"]+)")?[\s\S]*?\/>/g,
    (_, src, poster = "") =>
      `\n\n<video controls ${poster ? `poster="${poster}"` : ""} src="${src}"></video>\n\n`,
  );

  transformed = transformed.replace(/<PRContributors\s*\/>/g, "");

  transformed = transformed.replace(
    /<Tabs[^>]*items=\{(\[[\s\S]*?\])\}>\s*([\s\S]*?)<\/Tabs>/g,
    (_, itemsSource, inner) => {
      let labels: string[] = [];

      try {
        labels = JSON.parse(itemsSource);
      } catch {
        labels = [];
      }

      const tabs = [
        ...inner.matchAll(/<Tab\s+value="([^"]+)">\s*```([a-zA-Z0-9-]*)\n([\s\S]*?)```\s*<\/Tab>/g),
      ]
        .map((match, index) => ({
          code: applyTextReplacements(match[3]).trim(),
          label: labels[index] ?? match[1],
          language: match[2] || "text",
        }))
        .filter((tab) => tab.code);

      return createToken(blocks, {tabs, type: "tabs"});
    },
  );

  transformed = transformed.replace(
    /<Callout(?:\s+type="([^"]+)")?\s*>([\s\S]*?)<\/Callout>/g,
    (_, tone = "info", content) =>
      createToken(blocks, {
        html: content.trim(),
        tone,
        type: "callout",
      }),
  );

  transformed = transformed.replace(/<ComponentPreview\s+name="([^"]+)"\s*\/>/g, (_, name) =>
    createToken(blocks, {
      language: "svelte",
      name,
      source: "",
      title: name,
      type: "preview",
    }),
  );

  transformed = transformed.replace(
    /<ComponentsCategory\s+category="([^"]+)"\s*\/>/g,
    (_, category) => {
      const normalized = normalizeComponentName(category);
      const items = allDocs
        .filter(
          (doc) =>
            doc.section === "components" && normalizeComponentName(doc.group ?? "") === normalized,
        )
        .map((doc) => ({
          description: doc.description,
          href: doc.href,
          title: doc.title,
        }));

      return createToken(blocks, {
        items,
        title: category,
        type: "related",
      });
    },
  );

  transformed = transformed.replace(
    /<RelatedComponents\s+component="([^"]+)"\s*\/>/g,
    (_, component) => {
      const normalized = normalizeComponentName(component);
      const related = allDocs
        .filter(
          (doc) =>
            doc.section === "components" &&
            doc.href !== currentDoc.href &&
            (doc.group === currentDoc.group || doc.slug.at(-1)?.includes(normalized)),
        )
        .slice(0, 4)
        .map((doc) => ({
          description: doc.description,
          href: doc.href,
          title: doc.title,
        }));

      return createToken(blocks, {
        items: related,
        title: "Related Components",
        type: "related",
      });
    },
  );

  transformed = transformed.replace(
    /<RelatedShowcases\s+component="([^"]+)"\s*\/>/g,
    (_, component) => {
      const normalized = normalizeComponentName(component);
      const showcaseItems = [...demoRegistry.values()]
        .filter((demo) => demo.name.startsWith(`${normalized}-`))
        .map((demo) => humanize(demo.fileName))
        .slice(0, 8);

      return createToken(blocks, {
        items: showcaseItems,
        title: "Showcases",
        type: "showcases",
      });
    },
  );

  const segments = transformed.split(/(\[\[DOC_TOKEN_\d+\]\])/g).filter(Boolean);
  const resolved: DocsBlock[] = [];

  for (const segment of segments) {
    const tokenMatch = segment.match(tokenPattern);

    if (!tokenMatch) {
      const html = (await renderMarkdown(segment)).trim();

      if (html) {
        resolved.push({html, type: "markdown"});
      }

      continue;
    }

    const block = blocks[Number(tokenMatch[1])];

    if (!block) {
      continue;
    }

    if (block.type === "preview") {
      const preview = await getDemoPreview(block.name);

      resolved.push({
        converted: preview.converted,
        language: preview.language,
        name: block.name,
        source: preview.source,
        title: preview.title,
        type: "preview",
      });
      continue;
    }

    if (block.type === "callout") {
      resolved.push({
        html: await renderMarkdown(block.html),
        tone: block.tone,
        type: "callout",
      });
      continue;
    }

    resolved.push(block);
  }

  return resolved;
}

function resolveAliasSlug(slugParts: string[]) {
  if (!slugParts.length) {
    return slugParts;
  }

  const resolved = [...slugParts];

  if (resolved[0] === "react") {
    resolved.shift();
  }

  if (resolved[0] === "handbook") {
    resolved[0] = "getting-started";
  }

  if (resolved[0] === "changelog") {
    resolved[0] = "releases";
  }

  if (resolved[0] === "components-list") {
    return ["components"];
  }

  if (resolved[0] === "migration" || resolved[0] === "native" || resolved[0] === "ui-for-agents") {
    return ["getting-started"];
  }

  if (resolved[0] === "components") {
    const aliases = new Map([
      ["textarea", "text-area"],
      ["listbox", "list-box"],
      ["combobox", "combo-box"],
      ["inputotp", "input-otp"],
      ["numberfield", "number-field"],
    ]);
    const last = resolved.at(-1);

    if (last && aliases.has(last)) {
      resolved[resolved.length - 1] = aliases.get(last) ?? last;
    }
  }

  return resolved;
}

export async function getAllDocs() {
  const docs = await loadDocsIndex();

  return docs.map(({groupLabel: _groupLabel, sourcePath: _sourcePath, ...doc}) => doc);
}

export async function getDocsNavigation() {
  const docs = await loadDocsIndex();
  const sections = new Map<string, DocsNavSection>();

  for (const doc of docs) {
    const sectionTitle = humanize(doc.section);
    const sectionHref = `/docs/${doc.section}`;
    const existingSection = sections.get(doc.section) ?? {
      groups: [],
      href: sectionHref,
      title: sectionTitle,
    };
    const groupTitle = doc.groupLabel ?? "Overview";
    let group = existingSection.groups.find((item) => item.title === groupTitle);

    if (!group) {
      group = {items: [], title: groupTitle};
      existingSection.groups.push(group);
    }

    group.items.push({
      description: doc.description,
      href: doc.href,
      title: doc.title,
    });

    sections.set(doc.section, existingSection);
  }

  return [...sections.values()].map((section) => ({
    ...section,
    groups: section.groups.map((group) => ({
      ...group,
      items: group.items.sort((left, right) => left.title.localeCompare(right.title)),
    })),
  }));
}

export async function getAllDocEntries() {
  const docs = await loadDocsIndex();
  const links = await loadInternalDocLinks();
  const entries = new Set(docs.map((doc) => doc.slug.join("/")));

  for (const target of links) {
    const slug = target.replace(/^\/docs\/?/, "");

    if (slug) {
      entries.add(slug);
    }
  }

  return [...entries];
}

export async function getDocBySlug(slugParts: string[]): Promise<DocsPage | undefined> {
  const docs = await loadDocsIndex();
  const resolvedSlug = resolveAliasSlug(slugParts);
  const doc =
    docs.find((entry) => entry.slug.join("/") === slugParts.join("/")) ??
    docs.find((entry) => entry.slug.join("/") === resolvedSlug.join("/")) ??
    (resolvedSlug[0] ? docs.find((entry) => entry.slug.join("/") === resolvedSlug[0]) : undefined);

  if (!doc) {
    return undefined;
  }

  const source = await fs.readFile(doc.sourcePath, "utf8");
  const {content} = matter(source);

  return {
    blocks: await buildBlocks(content, doc, docs),
    description: doc.description,
    group: doc.group,
    href: doc.href,
    section: doc.section,
    slug: doc.slug,
    title: doc.title,
  };
}
