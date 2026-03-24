<script lang="ts">
  import type {Snippet} from "svelte";

  import {AlertDialog as BitsAlertDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {alertDialogVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {getAlertDialogContext, setAlertDialogContext} from "./context";

  let {
    children,
    class: className = "",
    forceMount = false,
    isDismissable = false,
    isKeyboardDismissDisabled = true,
    onClick,
    variant = "opaque",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    isDismissable?: boolean;
    isKeyboardDismissDisabled?: boolean;
    onClick?: (event: MouseEvent) => void;
    variant?: "blur" | "opaque" | "transparent";
    [key: string]: unknown;
  } = $props();

  const context = getAlertDialogContext();
  const localSlots = $derived.by(() =>
    normalizeVariantResult(alertDialogVariants({variant}), "alert-dialog"),
  );
  const slots = $derived.by(() => ({
    ...context.slots,
    ...localSlots,
  }));
  const slotClass = $derived(slots.backdrop?.({}) ?? "alert-dialog__backdrop");

  setAlertDialogContext({
    close: context.close,
    get isDismissable() {
      return isDismissable;
    },
    get isKeyboardDismissDisabled() {
      return isKeyboardDismissDisabled;
    },
    get open() {
      return context.open;
    },
    get placement() {
      return context.placement;
    },
    get slots() {
      return slots;
    },
  });
</script>

{#snippet overlayChild({props})}
  <div
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-entering={context.open ? "true" : undefined}
    data-exiting={context.open ? undefined : "true"}
    data-slot="alert-dialog-backdrop"
    onclick={(event) => {
      event.stopPropagation();
      onClick?.(event);
    }}
  >
    {@render children?.()}
  </div>
{/snippet}

<BitsAlertDialog.Portal>
  <BitsAlertDialog.Overlay child={overlayChild} {forceMount} />
</BitsAlertDialog.Portal>
