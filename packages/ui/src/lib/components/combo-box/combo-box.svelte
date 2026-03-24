<script lang="ts">
  import type {Snippet} from "svelte";

  import {Combobox as BitsCombobox} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {comboBoxVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setComboBoxContext} from "./context";

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
    onOpenChange,
    onValueChange,
    open = $bindable(false),
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
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    items?: Array<{disabled?: boolean; label: string; value: string}>;
    loop?: boolean;
    name?: string;
    onOpenChange?: (open: boolean) => void;
    onValueChange?: (value: string | string[]) => void;
    open?: boolean;
    scrollAlignment?: "center" | "nearest";
    type?: "multiple" | "single";
    value?: string | string[];
    [key: string]: any;
  } = $props();

  const slots = $derived.by(() =>
    normalizeVariantResult(comboBoxVariants({fullWidth}), "combo-box"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "combo-box");
  let itemLabels = $state<Record<string, string>>({});
  const currentValue = $derived.by(() => {
    if (type === "multiple") {
      return Array.isArray(value) ? value : [];
    }

    return typeof value === "string" ? value : "";
  });

  setComboBoxContext({
    get open() {
      return open;
    },
    registerItem(itemValue, label) {
      itemLabels[itemValue] = label;
    },
    get slots() {
      return slots;
    },
  });
</script>

<BitsCombobox.Root
  {allowDeselect}
  disabled={Boolean(isDisabled)}
  {items}
  {loop}
  {name}
  {onOpenChange}
  onValueChange={(nextValue) => {
    value = nextValue as typeof value;
    onValueChange?.(nextValue);
  }}
  bind:open
  required={Boolean(isRequired)}
  {scrollAlignment}
  {type}
  value={currentValue as never}
>
  <div
    aria-invalid={isInvalid ? "true" : undefined}
    class={cn(rootClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-invalid={withDataState(isInvalid)}
    data-open={withDataState(open)}
    data-readonly={withDataState(isReadOnly)}
    data-required={withDataState(isRequired)}
    data-slot="combo-box"
    {...restProps}
  >
    {@render children?.()}
  </div>
</BitsCombobox.Root>
