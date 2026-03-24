<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getPaginationContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getPaginationContext);
  const slotClass = $derived(context?.slots?.ellipsis?.({}) ?? "pagination__ellipsis");
</script>

<span aria-hidden="true" class={cn(slotClass, className)} data-slot="pagination-ellipsis" {...restProps}>
  {#if children}
    {@render children()}
  {:else}
    &hellip;
  {/if}
</span>
