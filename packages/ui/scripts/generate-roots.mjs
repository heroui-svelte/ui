/* eslint-disable no-console */
import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(packageRoot, "..", "..");
const legacyIndexPath = path.join(
  repoRoot,
  "packages",
  "react-legacy",
  "src",
  "components",
  "index.ts",
);
const legacyComponentsRoot = path.join(repoRoot, "packages", "react-legacy", "src", "components");
const stylesRoot = path.join(repoRoot, "packages", "styles", "src", "components");
const outRoot = path.join(packageRoot, "src", "lib", "components");
const customComponents = new Set([
  "accordion",
  "alert",
  "alert-dialog",
  "avatar",
  "badge",
  "breadcrumbs",
  "button",
  "button-group",
  "card",
  "checkbox",
  "checkbox-group",
  "chip",
  "close-button",
  "color-area",
  "color-field",
  "color-picker",
  "color-slider",
  "color-swatch",
  "color-swatch-picker",
  "description",
  "disclosure",
  "disclosure-group",
  "drawer",
  "empty-state",
  "error-message",
  "field-error",
  "fieldset",
  "form",
  "header",
  "input",
  "input-group",
  "input-otp",
  "kbd",
  "label",
  "link",
  "list-box",
  "list-box-item",
  "list-box-section",
  "modal",
  "menu",
  "menu-item",
  "menu-section",
  "pagination",
  "meter",
  "popover",
  "progress-bar",
  "progress-circle",
  "radio",
  "radio-group",
  "scroll-shadow",
  "search-field",
  "select",
  "separator",
  "skeleton",
  "slider",
  "spinner",
  "surface",
  "switch",
  "switch-group",
  "table",
  "tabs",
  "tag",
  "tag-group",
  "text",
  "textfield",
  "textarea",
  "toast",
  "toggle-button",
  "toggle-button-group",
  "toolbar",
  "tooltip",
  "autocomplete",
  "combo-box",
  "date-field",
  "date-picker",
  "date-range-picker",
  "dropdown",
  "number-field",
  "time-field",
]);

const nameOverrides = new Map([
  ["accordion", "Accordion"],
  ["alert", "Alert"],
  ["alert-dialog", "AlertDialog"],
  ["autocomplete", "Autocomplete"],
  ["avatar", "Avatar"],
  ["badge", "Badge"],
  ["breadcrumbs", "Breadcrumbs"],
  ["button", "Button"],
  ["button-group", "ButtonGroup"],
  ["card", "Card"],
  ["checkbox", "Checkbox"],
  ["checkbox-group", "CheckboxGroup"],
  ["chip", "Chip"],
  ["close-button", "CloseButton"],
  ["color-area", "ColorArea"],
  ["color-field", "ColorField"],
  ["color-picker", "ColorPicker"],
  ["color-slider", "ColorSlider"],
  ["color-swatch", "ColorSwatch"],
  ["color-swatch-picker", "ColorSwatchPicker"],
  ["combo-box", "ComboBox"],
  ["date-field", "DateField"],
  ["date-picker", "DatePicker"],
  ["date-range-picker", "DateRangePicker"],
  ["description", "Description"],
  ["disclosure", "Disclosure"],
  ["disclosure-group", "DisclosureGroup"],
  ["drawer", "Drawer"],
  ["dropdown", "Dropdown"],
  ["empty-state", "EmptyState"],
  ["error-message", "ErrorMessage"],
  ["field-error", "FieldError"],
  ["fieldset", "Fieldset"],
  ["form", "Form"],
  ["header", "Header"],
  ["input", "Input"],
  ["input-group", "InputGroup"],
  ["input-otp", "InputOTP"],
  ["kbd", "Kbd"],
  ["label", "Label"],
  ["link", "Link"],
  ["list-box", "ListBox"],
  ["list-box-item", "ListBoxItem"],
  ["list-box-section", "ListBoxSection"],
  ["menu", "Menu"],
  ["menu-item", "MenuItem"],
  ["menu-section", "MenuSection"],
  ["meter", "Meter"],
  ["modal", "Modal"],
  ["number-field", "NumberField"],
  ["pagination", "Pagination"],
  ["popover", "Popover"],
  ["progress-bar", "ProgressBar"],
  ["progress-circle", "ProgressCircle"],
  ["radio", "Radio"],
  ["radio-group", "RadioGroup"],
  ["scroll-shadow", "ScrollShadow"],
  ["search-field", "SearchField"],
  ["select", "Select"],
  ["separator", "Separator"],
  ["skeleton", "Skeleton"],
  ["slider", "Slider"],
  ["spinner", "Spinner"],
  ["surface", "Surface"],
  ["switch", "Switch"],
  ["switch-group", "SwitchGroup"],
  ["table", "Table"],
  ["tabs", "Tabs"],
  ["tag", "Tag"],
  ["tag-group", "TagGroup"],
  ["text", "Text"],
  ["textarea", "TextArea"],
  ["textfield", "TextField"],
  ["time-field", "TimeField"],
  ["toast", "Toast"],
  ["toggle-button", "ToggleButton"],
  ["toggle-button-group", "ToggleButtonGroup"],
  ["toolbar", "Toolbar"],
  ["tooltip", "Tooltip"],
]);

const rootElementOverrides = new Map([
  ["alert", "section"],
  ["alert-dialog", "section"],
  ["breadcrumbs", "nav"],
  ["button", "button"],
  ["close-button", "button"],
  ["form", "form"],
  ["header", "header"],
  ["input", "input"],
  ["label", "label"],
  ["link", "a"],
  ["separator", "hr"],
  ["table", "table"],
  ["text", "p"],
  ["textarea", "textarea"],
  ["toggle-button", "button"],
]);

const roleElementOverrides = new Map([
  ["Abbr", "abbr"],
  ["ActionButton", "button"],
  ["Anchor", "span"],
  ["Arrow", "span"],
  ["Backdrop", "div"],
  ["Body", "div"],
  ["ClearButton", "button"],
  ["CloseButton", "button"],
  ["CloseTrigger", "button"],
  ["Collection", "div"],
  ["Container", "div"],
  ["Content", "div"],
  ["Control", "div"],
  ["DecrementButton", "button"],
  ["Description", "p"],
  ["Dialog", "div"],
  ["Ellipsis", "span"],
  ["Fallback", "span"],
  ["Fill", "div"],
  ["FillCircle", "circle"],
  ["Footer", "footer"],
  ["Grid", "div"],
  ["GridBody", "div"],
  ["GridHeader", "div"],
  ["Group", "div"],
  ["Handle", "span"],
  ["Header", "header"],
  ["HeaderCell", "div"],
  ["Heading", "h3"],
  ["Icon", "span"],
  ["Image", "img"],
  ["IncrementButton", "button"],
  ["Indicator", "span"],
  ["Input", "input"],
  ["InputContainer", "div"],
  ["Item", "div"],
  ["Label", "span"],
  ["Legend", "legend"],
  ["Link", "a"],
  ["List", "div"],
  ["ListContainer", "div"],
  ["LoadMoreContent", "div"],
  ["Marks", "div"],
  ["Menu", "div"],
  ["NavButton", "button"],
  ["Next", "button"],
  ["NextIcon", "span"],
  ["Output", "output"],
  ["Panel", "div"],
  ["Popover", "div"],
  ["Prefix", "span"],
  ["Previous", "button"],
  ["PreviousIcon", "span"],
  ["RangeSeparator", "span"],
  ["RemoveButton", "button"],
  ["ResizableContainer", "div"],
  ["Row", "div"],
  ["ScrollContainer", "div"],
  ["SearchIcon", "span"],
  ["Section", "section"],
  ["Segment", "span"],
  ["Separator", "div"],
  ["Slot", "span"],
  ["SubmenuIndicator", "span"],
  ["SubmenuTrigger", "button"],
  ["Suffix", "span"],
  ["Summary", "p"],
  ["Swatch", "span"],
  ["Tab", "button"],
  ["TextArea", "textarea"],
  ["Thumb", "span"],
  ["Title", "h3"],
  ["Track", "div"],
  ["TrackCircle", "circle"],
  ["Trigger", "button"],
  ["TriggerIndicator", "span"],
  ["Value", "span"],
]);

const specificElementOverrides = new Map([
  ["BreadcrumbsItem", "span"],
  ["PaginationContent", "ul"],
  ["PaginationItem", "li"],
  ["ProgressCircleTrack", "svg"],
  ["TableBody", "tbody"],
  ["TableCell", "td"],
  ["TableColumn", "th"],
  ["TableFooter", "tfoot"],
  ["TableHeader", "thead"],
  ["TableRow", "tr"],
]);

const stylePropNames = [
  "accent",
  "animationType",
  "blur",
  "circle",
  "color",
  "cover",
  "fullWidth",
  "hideScrollBar",
  "isAttached",
  "isDetached",
  "isDisabled",
  "isIconOnly",
  "isInvalid",
  "isRequired",
  "layout",
  "orientation",
  "placement",
  "shape",
  "showDots",
  "size",
  "status",
  "variant",
];

const stateAttrDefs = [
  ["current", "isCurrent"],
  ["disabled", "isDisabled"],
  ["expanded", "isExpanded"],
  ["focus-visible", "isFocusVisible"],
  ["hovered", "isHovered"],
  ["invalid", "isInvalid"],
  ["open", "isOpen || open"],
  ["pending", "isPending"],
  ["pressed", "isPressed"],
  ["readonly", "isReadOnly"],
  ["required", "isRequired"],
  ["selected", "isSelected"],
];

function parseStableComponents(source) {
  const stable = [];
  let inProgress = false;

  for (const line of source.split("\n")) {
    if (line.includes("// in progress")) {
      inProgress = true;
    }

    const match = line.match(/export \* from "\.\/([^"]+)";/);

    if (match && !inProgress) {
      stable.push(match[1]);
    }
  }

  return stable.filter((name) => name !== "icons" && name !== "rac");
}

function extractObjectBlock(source, marker) {
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    return "";
  }

  const start = source.indexOf("{", markerIndex);

  if (start === -1) {
    return "";
  }

  let depth = 0;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        return source.slice(start + 1, index);
      }
    }
  }

  return "";
}

function parseLocalNamedExports(source) {
  const marker =
    "/* -------------------------------------------------------------------------------------------------\n * Named Component";
  const markerIndex = source.indexOf(marker);
  const searchSource = markerIndex === -1 ? source : source.slice(markerIndex);
  const match = searchSource.match(/export \{([\s\S]*?)\}(?: from "[^"]+")?;/);

  if (!match) {
    return [];
  }

  return match[1]
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => name.replace(/\s+as\s+.*/, "").trim());
}

async function parseStyleMeta(componentName) {
  const styleDir = path.join(stylesRoot, componentName);

  try {
    await fs.access(styleDir);
  } catch {
    return {
      slotKeys: [],
      styleExportName: null,
    };
  }

  const files = await fs.readdir(styleDir);
  const styleFile = files.find((file) => file.endsWith(".styles.ts"));

  if (!styleFile) {
    return {
      slotKeys: [],
      styleExportName: null,
    };
  }

  const source = await fs.readFile(path.join(styleDir, styleFile), "utf8");
  const styleExportName = source.match(/(?:export const|const)\s+(\w+)\s*=\s*tv\(/)?.[1] ?? null;
  const variantTypeName = source.match(/export type\s+(\w+)\s*=/)?.[1] ?? null;
  const slotsBlock = extractObjectBlock(source, "slots:");
  const slotKeys = [...slotsBlock.matchAll(/([A-Za-z0-9_]+)\s*:/g)].map((match) => match[1]);

  return {
    slotKeys,
    styleExportName,
    variantTypeName,
  };
}

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function toCamelCase(value) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function getRootExportName(componentName) {
  return nameOverrides.get(componentName);
}

function getRole(componentName, exportName) {
  const componentExportName = getRootExportName(componentName) ?? "";

  if (exportName === componentExportName || exportName === `${componentExportName}Root`) {
    return "Root";
  }

  return exportName.replace(componentExportName, "");
}

function getElement(componentName, exportName) {
  const componentExportName = getRootExportName(componentName);

  if (exportName === componentExportName || exportName === `${componentExportName}Root`) {
    return rootElementOverrides.get(componentName) ?? "div";
  }

  return (
    specificElementOverrides.get(exportName) ??
    roleElementOverrides.get(getRole(componentName, exportName)) ??
    "div"
  );
}

function renderStateAttributes(indent = "") {
  return stateAttrDefs
    .map(([name, expression]) => `${indent}data-${name}={withDataState(${expression})}`)
    .join("\n");
}

function renderElementBody(element) {
  if (element === "input" || element === "hr" || element === "img") {
    return " />";
  }

  if (element === "textarea") {
    return `>{restProps.value ?? ""}</${element}>`;
  }

  return `>
  {@render children?.()}
</${element}>`;
}

function renderStyleProps() {
  return stylePropNames.map((name) => `    ${name},`).join("\n");
}

function renderStyleArgs() {
  return stylePropNames.map((name) => `        ${name},`).join("\n");
}

function createContextTemplate(componentExportName) {
  return `import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type ${componentExportName}ContextValue = SlotsContextValue;

export const [get${componentExportName}Context, set${componentExportName}Context] =
  createSlotsContext<${componentExportName}ContextValue>();
`;
}

function createRootTemplate({
  componentExportName,
  componentName,
  element,
  hasContext,
  styleExportName,
}) {
  const styleImport = styleExportName
    ? `\n  import {${styleExportName}} from "@heroui-svelte/styles";`
    : "";
  const contextImport = hasContext
    ? `\n  import {set${componentExportName}Context} from "./context";`
    : "";
  const contextSetup = hasContext
    ? `\n  set${componentExportName}Context({
    get slots() {
      return slots;
    },
  });`
    : "";

  return `<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";${styleImport}
  import {normalizeVariantResult, withDataState} from "../../internal/slots";${contextImport}

  let {
    children,
    class: className = "",
${renderStyleProps()}
    isCurrent,
    isExpanded,
    isFocusVisible,
    isHovered,
    isOpen,
    isPending,
    isPressed,
    isReadOnly,
    isSelected,
    open,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const slots = $derived.by(() =>
    normalizeVariantResult(
      ${
        styleExportName
          ? `(${styleExportName} as any)({
${renderStyleArgs()}
      })`
          : "undefined"
      },
      "${componentName}",
    ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "${componentName}");${contextSetup}
</script>

<${element}
  class={cn(rootClass, className)}
${renderStateAttributes("  ")}
  data-slot="${componentName}"
  {...restProps}
${renderElementBody(element)}
`;
}

function createPartTemplate({componentExportName, componentName, element, exportName, slotKey}) {
  const role = getRole(componentName, exportName);
  const dataSlot = `${componentName}-${toKebabCase(role)}`;
  const fallbackClass = `${componentName}__${toKebabCase(role)}`;

  return `<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {get${componentExportName}Context} from "./context";

  let {
    children,
    class: className = "",
    isCurrent,
    isDisabled,
    isExpanded,
    isFocusVisible,
    isHovered,
    isInvalid,
    isOpen,
    isPending,
    isPressed,
    isReadOnly,
    isRequired,
    isSelected,
    open,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(get${componentExportName}Context);
  const slotClass = $derived(context?.slots?.${slotKey}?.({}) ?? "${fallbackClass}");
</script>

<${element}
  class={cn(slotClass, className)}
${renderStateAttributes("  ")}
  data-slot="${dataSlot}"
  {...restProps}
${renderElementBody(element)}
`;
}

async function clearGeneratedFiles(componentDir) {
  try {
    const files = await fs.readdir(componentDir);

    await Promise.all(
      files
        .filter((file) => file.endsWith(".svelte") || file === "context.ts" || file === "index.ts")
        .map((file) => fs.rm(path.join(componentDir, file), {force: true})),
    );
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
}

async function writeComponentFiles({
  componentDir,
  componentExportName,
  componentName,
  localExports,
  slotKeys,
  styleExportName,
  variantTypeName,
}) {
  const hasContext = localExports.length > 1;
  const exportLines = [
    `export {default as ${componentExportName}} from "./${componentName}.svelte";`,
    `export {default as ${componentExportName}Root} from "./${componentName}.svelte";`,
  ];

  await clearGeneratedFiles(componentDir);
  await fs.mkdir(componentDir, {recursive: true});

  if (hasContext) {
    await fs.writeFile(
      path.join(componentDir, "context.ts"),
      createContextTemplate(componentExportName),
    );
  }

  await fs.writeFile(
    path.join(componentDir, `${componentName}.svelte`),
    createRootTemplate({
      componentExportName,
      componentName,
      element: getElement(componentName, componentExportName),
      hasContext,
      styleExportName,
    }),
  );

  for (const exportName of localExports) {
    if (exportName === componentExportName || exportName === `${componentExportName}Root`) {
      continue;
    }

    const role = getRole(componentName, exportName);
    const slotKey = slotKeys.includes(toCamelCase(role))
      ? toCamelCase(role)
      : slotKeys.includes(role.toLowerCase())
        ? role.toLowerCase()
        : toCamelCase(role);
    const fileName = `${toKebabCase(role)}.svelte`;

    await fs.writeFile(
      path.join(componentDir, fileName),
      createPartTemplate({
        componentExportName,
        componentName,
        element: getElement(componentName, exportName),
        exportName,
        slotKey,
      }),
    );

    exportLines.push(`export {default as ${exportName}} from "./${fileName}";`);
  }

  if (styleExportName) {
    exportLines.push(`export {${styleExportName}} from "@heroui-svelte/styles";`);
  }

  if (variantTypeName) {
    exportLines.push(`export type {${variantTypeName}} from "@heroui-svelte/styles";`);
  }

  await fs.writeFile(path.join(componentDir, "index.ts"), `${exportLines.join("\n")}\n`);
}

async function ensureCustomComponent(componentName) {
  const componentDir = path.join(outRoot, componentName);

  await fs.access(path.join(componentDir, "index.ts"));
}

async function main() {
  const legacyIndex = await fs.readFile(legacyIndexPath, "utf8");
  const stableComponents = parseStableComponents(legacyIndex);
  const exportLines = [];

  await fs.mkdir(outRoot, {recursive: true});

  for (const componentName of stableComponents) {
    const componentExportName = getRootExportName(componentName);

    if (!componentExportName) {
      throw new Error(`Missing export name override for ${componentName}`);
    }

    if (customComponents.has(componentName)) {
      await ensureCustomComponent(componentName);
      exportLines.push(`export * from "./${componentName}";`);
      continue;
    }

    const legacyComponentIndex = await fs.readFile(
      path.join(legacyComponentsRoot, componentName, "index.ts"),
      "utf8",
    );
    const localExports = parseLocalNamedExports(legacyComponentIndex);
    const {slotKeys, styleExportName, variantTypeName} = await parseStyleMeta(componentName);

    await writeComponentFiles({
      componentDir: path.join(outRoot, componentName),
      componentExportName,
      componentName,
      localExports,
      slotKeys,
      styleExportName,
      variantTypeName,
    });

    exportLines.push(`export * from "./${componentName}";`);
  }

  exportLines.push('export {default as IconChevronDown} from "../icons/IconChevronDown.svelte";');
  exportLines.push('export {default as IconChevronLeft} from "../icons/IconChevronLeft.svelte";');
  exportLines.push('export {default as IconChevronRight} from "../icons/IconChevronRight.svelte";');
  exportLines.push('export {default as IconClose} from "../icons/IconClose.svelte";');
  exportLines.push('export {default as IconExternalLink} from "../icons/IconExternalLink.svelte";');

  await fs.writeFile(path.join(outRoot, "index.ts"), `${exportLines.join("\n")}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
