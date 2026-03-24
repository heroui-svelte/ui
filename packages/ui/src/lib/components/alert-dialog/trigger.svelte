<script lang="ts">
  import type {Snippet} from "svelte";

  import {AlertDialog as BitsAlertDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {getAlertDialogContext} from "./context";

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

  const context = getAlertDialogContext();
  const slotClass = $derived(context.slots.trigger?.({}) ?? "alert-dialog__trigger");
</script>

{#snippet triggerChild({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-slot="alert-dialog-trigger"
  >
    {@render children?.()}
  </button>
{/snippet}

<BitsAlertDialog.Trigger child={triggerChild} disabled={isDisabled} />
