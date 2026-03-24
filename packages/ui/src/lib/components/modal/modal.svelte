<script lang="ts">
  import type {Snippet} from "svelte";

  import {Dialog as BitsDialog} from "bits-ui";

  import {modalVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setModalContext, type ModalPlacement} from "./context";

  let {
    children,
    defaultOpen = false,
    isOpen,
    onOpenChange,
    open,
    placement = "auto",
    state: overlayState,
  }: {
    children?: Snippet;
    defaultOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: (nextOpen: boolean) => void;
    open?: boolean;
    placement?: ModalPlacement;
    state?: {
      isOpen?: boolean;
      setOpen?: (nextOpen: boolean) => void;
    };
  } = $props();

  const getDefaultOpen = () => defaultOpen;
  let uncontrolledOpen = $state(getDefaultOpen());

  const slots = $derived.by(() =>
    normalizeVariantResult(modalVariants(), "modal"),
  );
  const currentOpen = $derived(
    isOpen === undefined
      ? open === undefined
        ? overlayState?.isOpen === undefined
          ? uncontrolledOpen
          : overlayState.isOpen
        : open
      : isOpen,
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (
      isOpen === undefined &&
      open === undefined &&
      overlayState?.isOpen === undefined
    ) {
      uncontrolledOpen = nextOpen;
    }

    overlayState?.setOpen?.(nextOpen);
    onOpenChange?.(nextOpen);
  };

  setModalContext({
    close: () => handleOpenChange(false),
    get isDismissable() {
      return true;
    },
    get isKeyboardDismissDisabled() {
      return false;
    },
    get open() {
      return currentOpen;
    },
    get placement() {
      return placement;
    },
    get slots() {
      return slots;
    },
  });
</script>

<BitsDialog.Root onOpenChange={handleOpenChange} open={currentOpen}>
  {@render children?.()}
</BitsDialog.Root>
