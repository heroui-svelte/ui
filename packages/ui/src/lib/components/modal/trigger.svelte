<script lang="ts">
  import type {Snippet} from "svelte";

  import {Dialog as BitsDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {getModalContext} from "./context";

  let {
    children,
    class: className = "",
    isDisabled,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    isDisabled?: boolean;
    [key: string]: unknown;
  } = $props();

  const context = getModalContext();
  const slotClass = $derived(context.slots.trigger?.({}) ?? "modal__trigger");
</script>

{#snippet triggerChild({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-slot="modal-trigger"
  >
    {@render children?.()}
  </button>
{/snippet}

<BitsDialog.Trigger child={triggerChild} disabled={isDisabled} />
