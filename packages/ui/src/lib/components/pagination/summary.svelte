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
  const slotClass = $derived(context?.slots?.summary?.({}) ?? "pagination__summary");
</script>

<div class={cn(slotClass, className)} data-slot="pagination-summary" {...restProps}>
  {@render children?.()}
</div>
