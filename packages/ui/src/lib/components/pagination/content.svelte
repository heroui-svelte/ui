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
  const slotClass = $derived(context?.slots?.content?.({}) ?? "pagination__content");
</script>

<ul class={cn(slotClass, className)} data-slot="pagination-content" {...restProps}>
  {@render children?.()}
</ul>
