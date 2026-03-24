<script lang="ts">
  import type {Snippet} from "svelte";

  import {Select as BitsSelect} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getSelectContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getSelectContext);
  const slotClass = $derived(context?.slots?.trigger?.({}) ?? "select__trigger");
</script>

{#snippet triggerChild({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-disabled={props["data-disabled"] !== undefined ? "true" : undefined}
    data-open={withDataState(context?.open)}
    data-slot="select-trigger"
  >
    {@render children?.()}
  </button>
{/snippet}

<BitsSelect.Trigger child={triggerChild} />
