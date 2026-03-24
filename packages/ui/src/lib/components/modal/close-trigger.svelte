<script lang="ts">
  import type {Snippet} from "svelte";

  import {Dialog as BitsDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {closeButtonVariants} from "@heroui-svelte/styles";
  import IconClose from "../../icons/IconClose.svelte";
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
  const slotClass = $derived(context.slots.closeTrigger?.({}) ?? "modal__close-trigger");
  const closeButtonClass = $derived(closeButtonVariants({variant: "default"}));
</script>

{#snippet closeChild({props})}
  <button
    {...props}
    {...restProps}
    aria-label="Close"
    class={cn(props.class, closeButtonClass, slotClass, className)}
    data-slot="modal-close-trigger"
  >
    {#if children}
      {@render children()}
    {:else}
      <IconClose data-slot="close-button-icon" />
    {/if}
  </button>
{/snippet}

<BitsDialog.Close child={closeChild} disabled={isDisabled} />
