<script lang="ts">
  import type {Snippet} from "svelte";

  import {disclosureGroupVariants} from "@heroui-svelte/styles";
  
  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setDisclosureGroupContext} from "./context";

  let {
    allowsMultipleExpanded = false,
    children,
    class: className = "",
    defaultExpandedKeys,
    expandedKeys,
    isDisabled = false,
    onExpandedChange,
    ...restProps
  }: {
    allowsMultipleExpanded?: boolean;
    children?: Snippet;
    class?: string;
    defaultExpandedKeys?: Iterable<string | number>;
    expandedKeys?: Iterable<string | number>;
    isDisabled?: boolean;
    onExpandedChange?: (keys: Set<string>) => void;
    [key: string]: any;
  } = $props();

  const toKeys = (keys?: Iterable<string | number>) =>
    keys ? Array.from(keys, (key) => String(key)) : [];

  const getDefaultExpandedKeys = () => toKeys(defaultExpandedKeys);

  let uncontrolledExpandedKeys = $state(getDefaultExpandedKeys());

  const slots = $derived.by(() => normalizeVariantResult(disclosureGroupVariants(), "disclosure-group"));
  const rootClass = $derived(slots.base?.({}) ?? "disclosure-group");
  const currentExpandedKeys = $derived(
    expandedKeys === undefined ? uncontrolledExpandedKeys : toKeys(expandedKeys),
  );

  const setExpandedKeys = (nextKeys: string[]) => {
    if (expandedKeys === undefined) {
      uncontrolledExpandedKeys = nextKeys;
    }

    onExpandedChange?.(new Set(nextKeys));
  };

  const toggleKey = (key: string, nextExpanded?: boolean) => {
    const expandedSet = new Set(currentExpandedKeys);
    const shouldExpand = nextExpanded ?? !expandedSet.has(key);

    if (allowsMultipleExpanded) {
      if (shouldExpand) {
        expandedSet.add(key);
      } else {
        expandedSet.delete(key);
      }

      setExpandedKeys(Array.from(expandedSet));

      return;
    }

    setExpandedKeys(shouldExpand ? [key] : []);
  };

  setDisclosureGroupContext({
    get allowsMultipleExpanded() {
      return allowsMultipleExpanded;
    },
    get expandedKeys() {
      return currentExpandedKeys;
    },
    get isDisabled() {
      return isDisabled;
    },
    toggleKey,
  });
</script>

<div
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-slot="disclosure-group"
  {...restProps}
>
  {@render children?.()}
</div>
