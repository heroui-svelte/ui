<script lang="ts">
  import type {Snippet} from "svelte";

  import IconChevronDown from "../../icons/IconChevronDown.svelte";
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getDisclosureContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDisclosureContext);
  const slotClass = $derived(context?.slots?.indicator?.({}) ?? "disclosure__indicator");
  const currentExpanded = $derived(Boolean(context?.isExpanded));
  const currentDisabled = $derived(Boolean(context?.isDisabled));
</script>

<span
  aria-hidden="true"
  class={cn(slotClass, className)}
  data-disabled={currentDisabled ? "true" : undefined}
  data-expanded={currentExpanded ? "true" : undefined}
  data-slot="disclosure-indicator"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <IconChevronDown />
  {/if}
</span>
