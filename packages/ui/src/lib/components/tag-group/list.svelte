<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getTagGroupContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getTagGroupContext);
  const slotClass = $derived(context?.slots?.list?.({}) ?? "tag-group__list");
</script>

<div class={cn(slotClass, className)} data-slot="tag-group-list" {...restProps}>
  {@render children?.()}
</div>
