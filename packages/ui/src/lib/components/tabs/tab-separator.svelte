<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getTabsContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getTabsContext);
  const slotClass = $derived(context?.slots.separator?.({}) ?? "tabs__separator");
</script>

<span
  aria-hidden="true"
  class={cn(slotClass, className)}
  data-slot="tabs-separator"
  {...restProps}
>
  {@render children?.()}
</span>
