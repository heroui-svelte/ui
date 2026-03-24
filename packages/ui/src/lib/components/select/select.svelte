<script lang="ts">
  import type {Snippet} from "svelte";

  import {Select as BitsSelect} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {selectVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import type {SelectItemOption} from "./context";
  import {setSelectContext} from "./context";

  let {
    allowDeselect = false,
    children,
    class: className = "",
    fullWidth = false,
    isDisabled = false,
    isIconOnly = false,
    isInvalid = false,
    isReadOnly = false,
    isRequired = false,
    items = [],
    loop = false,
    name = "",
    onOpenChange,
    onValueChange,
    variant = "primary",
    open = $bindable(false),
    placeholder = "",
    required,
    scrollAlignment = "nearest",
    type = "single",
    value = $bindable(undefined as string | string[] | undefined),
    ...restProps
  }: {
    allowDeselect?: boolean;
    children?: Snippet;
    class?: string;
    fullWidth?: boolean;
    isDisabled?: boolean;
    isIconOnly?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    items?: Iterable<unknown>;
    loop?: boolean;
    name?: string;
    onOpenChange?: (open: boolean) => void;
    onValueChange?: (value: string | string[]) => void;
    open?: boolean;
    placeholder?: string;
    required?: boolean;
    scrollAlignment?: "center" | "nearest";
    type?: "multiple" | "single";
    value?: string | string[];
    variant?: "primary" | "secondary";
    [key: string]: unknown;
  } = $props();

  type NormalizedItem = SelectItemOption;

  const normalizeItem = (item: unknown): NormalizedItem | null => {
    if (typeof item === "string") {
      return {
        label: item,
        value: item,
      };
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

  let registeredItems = $state<NormalizedItem[]>([]);

  const normalizedItems = $derived.by(() =>
    Array.from(items).map(normalizeItem).filter((item): item is NormalizedItem => item !== null),
  );
  const allItems = $derived.by(() => {
    const itemMap = new Map<string, NormalizedItem>();

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
    if (type === "multiple") {
      return Array.isArray(value) ? value : [];
    }

    return typeof value === "string" ? value : "";
  });
  const slots = $derived.by(() =>
    normalizeVariantResult(
      selectVariants({
        fullWidth,
        variant,
      }),
      "select",
    ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "select");
  const effectiveRequired = $derived(Boolean(required ?? isRequired));
  const valueText = $derived.by(() => {
    const lookupLabel = (entryValue: string) =>
      allItems.find((item) => item.value === entryValue)?.label ?? entryValue;

    if (type === "multiple") {
      return Array.isArray(currentValue) ? currentValue.map(lookupLabel).join(", ") : "";
    }

    return typeof currentValue === "string" && currentValue.length > 0
      ? lookupLabel(currentValue)
      : "";
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
    registerItem(item) {
      const existingItem = registeredItems.find((entry) => entry.value === item.value);

      if (
        existingItem &&
        existingItem.label === item.label &&
        existingItem.disabled === item.disabled
      ) {
        return;
      }

      registeredItems = [...registeredItems.filter((entry) => entry.value !== item.value), item];
    },
    get slots() {
      return slots;
    },
    get type() {
      return type;
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
    onValueChange?.(nextValue);
  }}
  bind:open
  required={effectiveRequired}
  {scrollAlignment}
  {type}
  value={currentValue as never}
>
  <div
    aria-invalid={isInvalid ? "true" : undefined}
    class={cn(rootClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-icon-only={withDataState(isIconOnly)}
    data-invalid={withDataState(isInvalid)}
    data-open={withDataState(open)}
    data-readonly={withDataState(isReadOnly)}
    data-required={withDataState(effectiveRequired)}
    data-slot="select"
    {...restProps}
  >
    {@render children?.()}
  </div>
</BitsSelect.Root>
