<script lang="ts">
  import type {Snippet} from "svelte";

  import {Combobox as BitsCombobox} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getComboBoxContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getComboBoxContext);
  const slotClass = $derived(context?.slots?.trigger?.({}) ?? "combo-box__trigger");
</script>

{#snippet triggerChild({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-disabled={props["data-disabled"] !== undefined ? "true" : undefined}
    data-open={withDataState(context?.open)}
    data-slot="combo-box-trigger"
  >
    {#if children}
      {@render children()}
    {:else}
      <svg
        aria-hidden="true"
        data-slot="combo-box-trigger-default-icon"
        fill="none"
        role="presentation"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.75"
        viewBox="0 0 16 16"
      >
        <path d="M4 6l4 4 4-4" />
      </svg>
    {/if}
  </button>
{/snippet}

<BitsCombobox.Trigger child={triggerChild} />
