<script lang="ts">
  import type {Snippet} from "svelte";

  import type {TagVariants} from "@heroui-svelte/styles";

  import {tagGroupVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setTagGroupContext} from "./context";

  let {
    children,
    class: className = "",
    defaultSelectedKeys,
    disabledKeys,
    isDisabled = false,
    onSelectionChange,
    selectedKeys,
    selectionMode = "none",
    size,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultSelectedKeys?: Iterable<string | number>;
    disabledKeys?: Iterable<string | number>;
    isDisabled?: boolean;
    onSelectionChange?: (keys: Set<string>) => void;
    selectedKeys?: Iterable<string | number>;
    selectionMode?: "multiple" | "none" | "single";
    size?: TagVariants["size"];
    variant?: TagVariants["variant"];
    [key: string]: any;
  } = $props();

  const toValues = (source?: Iterable<string | number>) =>
    source ? Array.from(source, (value) => String(value)) : [];

  const getDefaultSelectedValues = () => toValues(defaultSelectedKeys);

  let uncontrolledSelectedValues = $state(getDefaultSelectedValues());

  const currentSelectedValues = $derived(
    selectedKeys ? toValues(selectedKeys) : uncontrolledSelectedValues,
  );
  const currentDisabledValues = $derived(toValues(disabledKeys));
  const slots = $derived.by(() => normalizeVariantResult(tagGroupVariants(), "tag-group"));
  const rootClass = $derived(slots.base?.({}) ?? "tag-group");

  const emitSelectionChange = (nextValues: string[]) => {
    onSelectionChange?.(new Set(nextValues));
  };

  const setSelectedValues = (nextValues: string[]) => {
    if (!selectedKeys) {
      uncontrolledSelectedValues = nextValues;
    }

    emitSelectionChange(nextValues);
  };

  const toggleValue = (value: string) => {
    if (selectionMode === "none") {
      return;
    }

    const selectedSet = new Set(currentSelectedValues);

    if (selectionMode === "single") {
      setSelectedValues(selectedSet.has(value) ? [] : [value]);

      return;
    }

    if (selectedSet.has(value)) {
      selectedSet.delete(value);
    } else {
      selectedSet.add(value);
    }

    setSelectedValues(Array.from(selectedSet));
  };

  const removeValue = (value: string) => {
    const selectedSet = new Set(currentSelectedValues);

    if (selectedSet.delete(value)) {
      setSelectedValues(Array.from(selectedSet));
    }
  };

  setTagGroupContext({
    get disabledValues() {
      return currentDisabledValues;
    },
    get isDisabled() {
      return isDisabled;
    },
    removeValue,
    get selectedValues() {
      return currentSelectedValues;
    },
    get selectionMode() {
      return selectionMode;
    },
    get size() {
      return size;
    },
    get slots() {
      return slots;
    },
    toggleValue,
    get variant() {
      return variant;
    },
  });
</script>

<div
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-slot="tag-group"
  {...restProps}
>
  {@render children?.()}
</div>
