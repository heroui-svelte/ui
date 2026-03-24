<script lang="ts">
  import type {Snippet} from "svelte";

  import {Tabs as BitsTabs} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getTabsContext} from "./context";

  let {
    children,
    class: className = "",
    id,
    value,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    id?: string | number;
    value?: string | number;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getTabsContext);
  const slotClass = $derived(context?.slots.tabPanel?.({}) ?? "tabs__panel");
  const resolvedValue = $derived(String(value ?? id ?? ""));
</script>

<BitsTabs.Content
  class={cn(slotClass, className)}
  data-orientation={context?.orientation ?? "horizontal"}
  data-slot="tabs-panel"
  value={resolvedValue}
  {...restProps}
>
  {@render children?.()}
</BitsTabs.Content>
