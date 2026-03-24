<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {alertDialogVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {
    getAlertDialogContext,
    setAlertDialogContext,
    type AlertDialogPlacement,
  } from "./context";

  let {
    children,
    class: className = "",
    placement = "auto",
    size,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    placement?: AlertDialogPlacement;
    size?: "cover" | "lg" | "md" | "sm" | "xs";
    [key: string]: unknown;
  } = $props();

  const context = getAlertDialogContext();
  const localSlots = $derived.by(() =>
    normalizeVariantResult(alertDialogVariants({size}), "alert-dialog"),
  );
  const slots = $derived.by(() => ({
    ...context.slots,
    ...localSlots,
  }));
  const slotClass = $derived(slots.container?.({}) ?? "alert-dialog__container");

  setAlertDialogContext({
    close: context.close,
    get isDismissable() {
      return context.isDismissable;
    },
    get isKeyboardDismissDisabled() {
      return context.isKeyboardDismissDisabled;
    },
    get open() {
      return context.open;
    },
    get placement() {
      return placement;
    },
    get slots() {
      return slots;
    },
  });
</script>

<div
  class={cn(slotClass, className)}
  data-entering={context.open ? "true" : undefined}
  data-exiting={context.open ? undefined : "true"}
  data-placement={placement}
  data-slot="alert-dialog-container"
  {...restProps}
>
  {@render children?.()}
</div>
