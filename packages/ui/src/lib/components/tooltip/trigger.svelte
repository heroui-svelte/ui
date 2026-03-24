<script lang="ts">
  import type {Snippet} from "svelte";

  import {Tooltip as BitsTooltip} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getTooltipContext} from "./context";

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

  const context = safeGetContext(getTooltipContext);
  const slotClass = $derived(context?.slots.trigger?.({}) ?? "tooltip__trigger");
</script>

{#snippet triggerChild({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-slot="tooltip-trigger"
  >
    {@render children?.()}
  </button>
{/snippet}

<BitsTooltip.Trigger child={triggerChild} disabled={isDisabled} />
