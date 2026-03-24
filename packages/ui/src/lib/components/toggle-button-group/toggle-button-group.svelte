<script lang="ts">
  import type {Snippet} from "svelte";

  import type {ToggleButtonGroupVariants, ToggleButtonVariants} from "@heroui-svelte/styles";

  import {ToggleGroup as BitsToggleGroup} from "bits-ui";
  import {toggleButtonGroupVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getToolbarContext} from "../toolbar/context";
  import {setToggleButtonGroupContext} from "./context";

  let {
    children,
    class: className = "",
    defaultSelectedKeys,
    fullWidth = false,
    isDetached = false,
    isDisabled = false,
    loop = true,
    onSelectionChange,
    orientation,
    rovingFocus = true,
    selectedKeys,
    selectionMode = "single",
    size,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultSelectedKeys?: Iterable<string | number>;
    fullWidth?: ToggleButtonGroupVariants["fullWidth"];
    isDetached?: ToggleButtonGroupVariants["isDetached"];
    isDisabled?: boolean;
    loop?: boolean;
    onSelectionChange?: (keys: Set<string>) => void;
    orientation?: ToggleButtonGroupVariants["orientation"];
    rovingFocus?: boolean;
    selectedKeys?: Iterable<string | number>;
    selectionMode?: "multiple" | "single";
    size?: ToggleButtonVariants["size"];
    [key: string]: any;
  } = $props();

  const toolbarContext = safeGetContext(getToolbarContext);
  const resolvedOrientation = $derived(orientation ?? toolbarContext?.orientation ?? "horizontal");

  const toValues = (source?: Iterable<string | number>) =>
    source ? Array.from(source, (value) => String(value)) : [];

  const getDefaultValues = () => toValues(defaultSelectedKeys);

  let uncontrolledSingleValue = $state(getDefaultValues()[0] ?? "");
  let uncontrolledMultipleValue = $state(getDefaultValues());

  const controlledValues = $derived(selectedKeys ? toValues(selectedKeys) : undefined);
  const currentSingleValue = $derived(controlledValues ? (controlledValues[0] ?? "") : uncontrolledSingleValue);
  const currentMultipleValue = $derived(controlledValues ?? uncontrolledMultipleValue);

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        toggleButtonGroupVariants({
          fullWidth,
          isDetached,
          orientation: resolvedOrientation,
        }),
        "toggle-button-group",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "toggle-button-group");

  const emitSelectionChange = (nextValues: string[]) => {
    onSelectionChange?.(new Set(nextValues));
  };

  const handleSingleValueChange = (nextValue: string) => {
    if (!controlledValues) {
      uncontrolledSingleValue = nextValue;
    }

    emitSelectionChange(nextValue ? [nextValue] : []);
  };

  const handleMultipleValueChange = (nextValue: string[]) => {
    if (!controlledValues) {
      uncontrolledMultipleValue = nextValue;
    }

    emitSelectionChange(nextValue);
  };

  setToggleButtonGroupContext({
    get isDisabled() {
      return isDisabled;
    },
    get size() {
      return size;
    },
    get slots() {
      return slots;
    },
  });
</script>

{#if selectionMode === "multiple"}
  <BitsToggleGroup.Root
    class={cn(rootClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-slot="toggle-button-group"
    disabled={isDisabled}
    {loop}
    onValueChange={handleMultipleValueChange}
    orientation={resolvedOrientation}
    {rovingFocus}
    type="multiple"
    value={currentMultipleValue}
    {...restProps}
  >
    {@render children?.()}
  </BitsToggleGroup.Root>
{:else}
  <BitsToggleGroup.Root
    class={cn(rootClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-slot="toggle-button-group"
    disabled={isDisabled}
    {loop}
    onValueChange={handleSingleValueChange}
    orientation={resolvedOrientation}
    {rovingFocus}
    type="single"
    value={currentSingleValue}
    {...restProps}
  >
    {@render children?.()}
  </BitsToggleGroup.Root>
{/if}
