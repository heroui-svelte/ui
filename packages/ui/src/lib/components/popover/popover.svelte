<script lang="ts">
  import type {Snippet} from "svelte";

  import {Popover as BitsPopover} from "bits-ui";

  import {popoverVariants} from "@heroui-svelte/styles";

  import {normalizeVariantResult} from "../../internal/slots";
  import {setPopoverContext} from "./context";

  let {
    children,
    defaultOpen = false,
    isOpen,
    onOpenChange,
    open,
  }: {
    children?: Snippet;
    defaultOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: (nextOpen: boolean) => void;
    open?: boolean;
  } = $props();

  const getDefaultOpen = () => defaultOpen;
  let uncontrolledOpen = $state(getDefaultOpen());

  const slots = $derived.by(() =>
    normalizeVariantResult(popoverVariants(), "popover"),
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

  setPopoverContext({
    get slots() {
      return slots;
    },
  });
</script>

<BitsPopover.Root onOpenChange={handleOpenChange} open={currentOpen}>
  {@render children?.()}
</BitsPopover.Root>
