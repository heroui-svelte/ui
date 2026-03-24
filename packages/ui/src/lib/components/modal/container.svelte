<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {modalVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {getModalContext, setModalContext, type ModalPlacement} from "./context";

  let {
    children,
    class: className = "",
    placement = "auto",
    scroll,
    size,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    placement?: ModalPlacement;
    scroll?: "inside" | "outside";
    size?: "cover" | "full" | "lg" | "md" | "sm" | "xs";
    [key: string]: unknown;
  } = $props();

  const context = getModalContext();
  const localSlots = $derived.by(() =>
    normalizeVariantResult(modalVariants({scroll, size}), "modal"),
  );
  const slots = $derived.by(() => ({
    ...context.slots,
    ...localSlots,
  }));
  const slotClass = $derived(slots.container?.({}) ?? "modal__container");

  setModalContext({
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
  data-slot="modal-container"
  {...restProps}
>
  {@render children?.()}
</div>
