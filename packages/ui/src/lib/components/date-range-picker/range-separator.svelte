<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getDateRangePickerContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDateRangePickerContext);
  const slotClass = $derived(context?.slots?.rangeSeparator?.({}) ?? "date-range-picker__range-separator");
</script>

<span
  aria-hidden="true"
  class={cn(slotClass, className)}
  data-slot="date-range-picker-range-separator"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    -
  {/if}
</span>
