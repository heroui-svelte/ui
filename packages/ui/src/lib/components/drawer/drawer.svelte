<script lang="ts">
  import type {Snippet} from "svelte";

  import {Dialog as BitsDialog} from "bits-ui";

  import {drawerVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setDrawerContext, type DrawerPlacement} from "./context";

  let {
    children,
    defaultOpen = false,
    isOpen,
    onOpenChange,
    open,
    placement = "bottom",
    state: overlayState,
  }: {
    children?: Snippet;
    defaultOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: (nextOpen: boolean) => void;
    open?: boolean;
    placement?: DrawerPlacement;
    state?: {
      isOpen?: boolean;
      setOpen?: (nextOpen: boolean) => void;
    };
  } = $props();

  const getDefaultOpen = () => defaultOpen;
  let uncontrolledOpen = $state(getDefaultOpen());

  const slots = $derived.by(() =>
    normalizeVariantResult(drawerVariants(), "drawer"),
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

  setDrawerContext({
    close: () => handleOpenChange(false),
    get isDismissable() {
      return true;
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
