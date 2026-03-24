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
    isDisabled = false,
    value,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    id?: string | number;
    isDisabled?: boolean;
    value?: string | number;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getTabsContext);
  const slotClass = $derived(context?.slots.tab?.({}) ?? "tabs__tab");
  const resolvedValue = $derived(String(value ?? id ?? ""));
</script>

{#snippet triggerChild({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-disabled={isDisabled ? "true" : undefined}
    data-selected={
      props["aria-selected"] === true || props["aria-selected"] === "true" ? "true" : undefined
    }
    data-slot="tabs-tab"
  >
    {@render children?.()}
  </button>
{/snippet}

<BitsTabs.Trigger child={triggerChild} disabled={isDisabled} value={resolvedValue} />
