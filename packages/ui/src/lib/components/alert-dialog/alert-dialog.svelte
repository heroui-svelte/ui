<script lang="ts">
  import type {Snippet} from "svelte";

  import {AlertDialog as BitsAlertDialog} from "bits-ui";

  import {alertDialogVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setAlertDialogContext, type AlertDialogPlacement} from "./context";

  let {
    children,
    defaultOpen = false,
    isOpen,
    onOpenChange,
    open,
    placement = "auto",
  }: {
    children?: Snippet;
    defaultOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: (nextOpen: boolean) => void;
    open?: boolean;
    placement?: AlertDialogPlacement;
  } = $props();

  const getDefaultOpen = () => defaultOpen;
  let uncontrolledOpen = $state(getDefaultOpen());

  const slots = $derived.by(() =>
    normalizeVariantResult(alertDialogVariants(), "alert-dialog"),
  );
  const currentOpen = $derived(
    isOpen === undefined ? (open === undefined ? uncontrolledOpen : open) : isOpen,
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (isOpen === undefined && open === undefined) {
      uncontrolledOpen = nextOpen;
    }

    onOpenChange?.(nextOpen);
  };

  setAlertDialogContext({
    close: () => handleOpenChange(false),
    get isDismissable() {
      return false;
    },
    get isKeyboardDismissDisabled() {
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

<BitsAlertDialog.Root onOpenChange={handleOpenChange} open={currentOpen}>
  {@render children?.()}
</BitsAlertDialog.Root>
