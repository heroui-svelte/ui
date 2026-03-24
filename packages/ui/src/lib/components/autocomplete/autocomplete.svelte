<script lang="ts">
  import type {Snippet} from "svelte";
  import type {AutocompleteVariants} from "@heroui-svelte/styles";

  import {Select as BitsSelect} from "bits-ui";

  import {autocompleteVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import type {SelectItemOption} from "../select/context";
  import {setSelectContext} from "../select/context";
  import {setAutocompleteContext} from "./context";

  let {
    allowDeselect = false,
    children,
    class: className = "",
    fullWidth = false,
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
    isRequired = false,
    items = [],
    loop = false,
    name = "",
    onChange,
    onClear,
    onOpenChange,
    onValueChange,
    open = $bindable(false),
    placeholder = "",
    required,
    scrollAlignment = "nearest",
    selectionMode = "single",
    value = $bindable(undefined as string | string[] | undefined),
    variant = "primary",
    ...restProps
  }: {
    allowDeselect?: boolean;
    children?: Snippet;
    class?: string;
    fullWidth?: AutocompleteVariants["fullWidth"];
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    items?: Iterable<unknown>;
    loop?: boolean;
    name?: string;
    onChange?: (value: string | string[] | undefined) => void;
    onClear?: () => void;
    onOpenChange?: (open: boolean) => void;
    onValueChange?: (value: string | string[] | undefined) => void;
    open?: boolean;
    placeholder?: string;
    required?: boolean;
    scrollAlignment?: "center" | "nearest";
    selectionMode?: "multiple" | "single";
    value?: string | string[];
    variant?: AutocompleteVariants["variant"];
    [key: string]: unknown;
  } = $props();

  const normalizeItem = (item: unknown): SelectItemOption | null => {
    if (typeof item === "string") {
      return {label: item, value: item};
    }

    if (!item || typeof item !== "object") {
      return null;
    }

    const candidate = item as Record<string, unknown>;
    const valueCandidate = candidate.value;

    if (typeof valueCandidate !== "string") {
      return null;
    }

    const labelCandidate = candidate.label;

    return {
      disabled: Boolean(candidate.disabled),
      label:
        typeof labelCandidate === "string" && labelCandidate.length > 0
          ? labelCandidate
          : valueCandidate,
      value: valueCandidate,
    };
  };

  let registeredItems = $state<SelectItemOption[]>([]);

  const normalizedItems = $derived.by(() =>
    Array.from(items).map(normalizeItem).filter((item): item is SelectItemOption => item !== null),
  );
  const allItems = $derived.by(() => {
    const itemMap = new Map<string, SelectItemOption>();

    for (const item of normalizedItems) {
      itemMap.set(item.value, item);
    }

    for (const item of registeredItems) {
      if (!itemMap.has(item.value)) {
        itemMap.set(item.value, item);
      }
    }

    return [...itemMap.values()];
  });
  const currentValue = $derived.by(() => {
    if (selectionMode === "multiple") {
      return Array.isArray(value) ? value : [];
    }

    return typeof value === "string" ? value : "";
  });
  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        autocompleteVariants({
          fullWidth,
          variant,
        }),
        "autocomplete",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "autocomplete");
  const effectiveRequired = $derived(Boolean(required ?? isRequired));
  const valueText = $derived.by(() => {
    const lookupLabel = (entryValue: string) =>
      allItems.find((item) => item.value === entryValue)?.label ?? entryValue;

    if (selectionMode === "multiple") {
      return Array.isArray(currentValue) ? currentValue.map(lookupLabel).join(", ") : "";
    }

    return typeof currentValue === "string" && currentValue.length > 0
      ? lookupLabel(currentValue)
      : "";
  });

  const clearSelection = () => {
    value = undefined as typeof value;
    onValueChange?.(undefined);
    onChange?.(undefined);
    onClear?.();
  };

  const registerItem = (item: SelectItemOption) => {
    const existingItem = registeredItems.find((entry) => entry.value === item.value);

    if (
      existingItem &&
      existingItem.label === item.label &&
      existingItem.disabled === item.disabled
    ) {
      return;
    }

    registeredItems = [...registeredItems.filter((entry) => entry.value !== item.value), item];
  };

  setAutocompleteContext({
    clearSelection,
    get items() {
      return allItems;
    },
    get open() {
      return open;
    },
    get placeholder() {
      return placeholder;
    },
    registerItem,
    get selectionMode() {
      return selectionMode;
    },
    get slots() {
      return slots;
    },
    get valueText() {
      return valueText;
    },
  });

  setSelectContext({
    get items() {
      return allItems;
    },
    get open() {
      return open;
    },
    get placeholder() {
      return placeholder;
    },
    registerItem,
    get slots() {
      return slots;
    },
    get type() {
      return selectionMode;
    },
    get valueText() {
      return valueText;
    },
  });
</script>

<BitsSelect.Root
  {allowDeselect}
  disabled={Boolean(isDisabled)}
  items={allItems}
  loop={loop}
  {name}
  {onOpenChange}
  onValueChange={(nextValue) => {
    value = nextValue as typeof value;
    onValueChange?.(nextValue as string | string[]);
    onChange?.(nextValue as string | string[]);
  }}
  bind:open
  required={effectiveRequired}
  {scrollAlignment}
  type={selectionMode}
  value={currentValue as never}
>
  <div
    aria-invalid={isInvalid ? "true" : undefined}
    class={cn(rootClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-invalid={withDataState(isInvalid)}
    data-open={withDataState(open)}
    data-readonly={withDataState(isReadOnly)}
    data-required={withDataState(effectiveRequired)}
    data-slot="autocomplete"
    {...restProps}
  >
    {@render children?.()}
  </div>
</BitsSelect.Root>
