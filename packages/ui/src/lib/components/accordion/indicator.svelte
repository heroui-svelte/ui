<script lang="ts">
  import type {Snippet} from "svelte";

  import IconChevronDown from "../../icons/IconChevronDown.svelte";
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAccordionContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getAccordionContext);
  const slotClass = $derived(context?.slots.indicator?.({}) ?? "accordion__indicator");
</script>

<span aria-hidden="true" class={cn(slotClass, className)} data-slot="accordion-indicator" {...restProps}>
  {#if children}
    {@render children()}
  {:else}
    <IconChevronDown />
  {/if}
</span>
