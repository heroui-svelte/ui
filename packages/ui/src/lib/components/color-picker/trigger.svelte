<script lang="ts">
  import type {Snippet} from "svelte";

  import {Popover as BitsPopover} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getColorPickerContext} from "./context";

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

  const context = safeGetContext(getColorPickerContext);
  const slotClass = $derived(context?.slots?.trigger?.({}) ?? "color-picker__trigger");
</script>

{#snippet triggerChild({props})}
  <button
    {...props}
    {...restProps}
    aria-expanded={withDataState(context?.open)}
    class={cn(props.class, slotClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-open={withDataState(context?.open)}
    data-slot="color-picker-trigger"
    type="button"
  >
    {@render children?.()}
  </button>
{/snippet}

<BitsPopover.Trigger child={triggerChild} disabled={isDisabled} />
