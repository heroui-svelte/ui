<script lang="ts">
  import type {Snippet} from "svelte";

  import {Tabs as BitsTabs} from "bits-ui";

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
  const slotClass = $derived(context?.slots.tabList?.({}) ?? "tabs__list");
</script>

<BitsTabs.List class={cn(slotClass, className)} data-slot="tabs-list" {...restProps}>
  {@render children?.()}
</BitsTabs.List>
