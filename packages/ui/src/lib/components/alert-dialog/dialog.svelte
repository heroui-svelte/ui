<script lang="ts">
  import type {Snippet} from "svelte";

  import {AlertDialog as BitsAlertDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {getAlertDialogContext} from "./context";

  let {
    children,
    class: className = "",
    forceMount = false,
    onEscapeKeydown,
    onInteractOutside,
    preventScroll = true,
    trapFocus = true,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    onEscapeKeydown?: (event: KeyboardEvent) => void;
    onInteractOutside?: (event: PointerEvent) => void;
    preventScroll?: boolean;
    trapFocus?: boolean;
    [key: string]: unknown;
  } = $props();

  const context = getAlertDialogContext();
  const slotClass = $derived(context.slots.dialog?.({}) ?? "alert-dialog__dialog");

  const handleEscape = (event: KeyboardEvent) => {
    onEscapeKeydown?.(event);

    if (context.isKeyboardDismissDisabled) {
      event.preventDefault();
    }
  };

  const handleInteractOutside = (event: PointerEvent) => {
    onInteractOutside?.(event);

    if (!context.isDismissable) {
      event.preventDefault();
    }
  };
</script>

{#snippet contentChild({props})}
  <div
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-entering={context.open ? "true" : undefined}
    data-exiting={context.open ? undefined : "true"}
    data-placement={context.placement}
    data-slot="alert-dialog-dialog"
  >
    {@render children?.()}
  </div>
{/snippet}

<BitsAlertDialog.Content
  child={contentChild}
  {forceMount}
  interactOutsideBehavior={context.isDismissable ? "close" : "ignore"}
  onEscapeKeydown={handleEscape}
  onInteractOutside={handleInteractOutside}
  {preventScroll}
  {trapFocus}
/>
