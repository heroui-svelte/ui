<script lang="ts">
  import type {Snippet} from "svelte";

  import {Accordion as BitsAccordion} from "bits-ui";

  import {accordionVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setAccordionContext} from "./context";

  let {
    allowsMultipleExpanded = false,
    children,
    class: className = "",
    defaultExpandedKeys,
    expandedKeys,
    hideSeparator = false,
    isDisabled = false,
    loop = true,
    onExpandedChange,
    orientation = "vertical",
    variant = "default",
    ...restProps
  }: {
    allowsMultipleExpanded?: boolean;
    children?: Snippet;
    class?: string;
    defaultExpandedKeys?: Iterable<string | number>;
    expandedKeys?: Iterable<string | number>;
    hideSeparator?: boolean;
    isDisabled?: boolean;
    loop?: boolean;
    onExpandedChange?: (keys: Set<string>) => void;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "surface";
    [key: string]: any;
  } = $props();

  const toKeyArray = (keys?: Iterable<string | number>) => [...(keys ?? [])].map(String);
  const getDefaultExpandedKeys = () => toKeyArray(defaultExpandedKeys);

  let uncontrolledExpandedKeys = $state(getDefaultExpandedKeys());

  const slots = $derived.by(() =>
    normalizeVariantResult(
      accordionVariants({
        variant,
      }),
      "accordion",
    ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "accordion");
  const currentExpandedKeys = $derived(
    expandedKeys === undefined ? uncontrolledExpandedKeys : toKeyArray(expandedKeys),
  );
  const currentExpandedKey = $derived(currentExpandedKeys[0] ?? "");

  const handleExpandedChange = (nextKeys: string[]) => {
    if (expandedKeys === undefined) {
      uncontrolledExpandedKeys = nextKeys;
    }

    onExpandedChange?.(new Set(nextKeys));
  };

  setAccordionContext({
    get hideSeparator() {
      return hideSeparator;
    },
    get slots() {
      return slots;
    },
  });
</script>

{#if allowsMultipleExpanded}
  <BitsAccordion.Root
    class={cn(rootClass, className)}
    data-slot="accordion"
    disabled={isDisabled}
    loop={loop}
    onValueChange={handleExpandedChange}
    orientation={orientation}
    type="multiple"
    value={currentExpandedKeys}
    {...restProps}
  >
    {@render children?.()}
  </BitsAccordion.Root>
{:else}
  <BitsAccordion.Root
    class={cn(rootClass, className)}
    data-slot="accordion"
    disabled={isDisabled}
    loop={loop}
    onValueChange={(nextValue) => handleExpandedChange(nextValue ? [nextValue] : [])}
    orientation={orientation}
    type="single"
    value={currentExpandedKey}
    {...restProps}
  >
    {@render children?.()}
  </BitsAccordion.Root>
{/if}
