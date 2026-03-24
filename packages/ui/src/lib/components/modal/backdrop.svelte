<script lang="ts">
  import type {Snippet} from "svelte";

  import {Dialog as BitsDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {modalVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {getModalContext, setModalContext} from "./context";

  let {
    children,
    class: className = "",
    forceMount = false,
    isDismissable = true,
    isKeyboardDismissDisabled = false,
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

  const context = getModalContext();
  const localSlots = $derived.by(() =>
    normalizeVariantResult(modalVariants({variant}), "modal"),
  );
  const slots = $derived.by(() => ({
    ...context.slots,
    ...localSlots,
  }));
  const slotClass = $derived(slots.backdrop?.({}) ?? "modal__backdrop");

  setModalContext({
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
    data-slot="modal-backdrop"
    onclick={(event) => {
      event.stopPropagation();
      onClick?.(event);
    }}
  >
    {@render children?.()}
  </div>
{/snippet}

<BitsDialog.Portal>
  <BitsDialog.Overlay child={overlayChild} {forceMount} />
</BitsDialog.Portal>
