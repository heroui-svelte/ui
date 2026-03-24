<script lang="ts">
  import type {Snippet} from "svelte";

  import {AlertDialog as BitsAlertDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {closeButtonVariants} from "@heroui-svelte/styles";
  import IconClose from "../../icons/IconClose.svelte";
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
  const slotClass = $derived(context.slots.closeTrigger?.({}) ?? "alert-dialog__close-trigger");
  const closeButtonClass = $derived(closeButtonVariants({variant: "default"}));
</script>

{#snippet cancelChild({props})}
  <button
    {...props}
    {...restProps}
    aria-label="Close"
    class={cn(props.class, closeButtonClass, slotClass, className)}
    data-slot="alert-dialog-close-trigger"
  >
    {#if children}
      {@render children()}
    {:else}
      <IconClose data-slot="close-button-icon" />
    {/if}
  </button>
{/snippet}

<BitsAlertDialog.Cancel child={cancelChild} disabled={isDisabled} />
