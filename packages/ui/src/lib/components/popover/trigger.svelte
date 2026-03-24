<script lang="ts">
  import type {Snippet} from "svelte";

  import {Popover as BitsPopover} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getPopoverContext} from "./context";

  let {
    children,
    class: className = "",
    isDisabled = false,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    isDisabled?: boolean;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getPopoverContext);
  const slotClass = $derived(context?.slots.trigger?.({}) ?? "popover__trigger");
</script>

{#snippet triggerChild({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-slot="popover-trigger"
  >
    {@render children?.()}
  </button>
{/snippet}

<BitsPopover.Trigger child={triggerChild} disabled={isDisabled} />
