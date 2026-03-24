<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getTableContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getTableContext);
  const slotClass = $derived(context?.slots?.loadMore?.({}) ?? "table__load-more");
</script>

<tr class={cn(slotClass, className)} data-slot="table-load-more" {...restProps}>
  {@render children?.()}
</tr>
