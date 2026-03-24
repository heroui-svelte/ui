<script lang="ts">
  import type {Snippet} from "svelte";

  import {Tooltip as BitsTooltip} from "bits-ui";

  import {tooltipVariants} from "@heroui-svelte/styles";

  import {normalizeVariantResult} from "../../internal/slots";
  import {setTooltipContext} from "./context";

  let {
    children,
    closeDelay = 0,
    defaultOpen = false,
    delay = 700,
    isDisabled = false,
    isOpen,
    onOpenChange,
    open,
  }: {
    children?: Snippet;
    closeDelay?: number;
    defaultOpen?: boolean;
    delay?: number;
    isDisabled?: boolean;
    isOpen?: boolean;
    onOpenChange?: (nextOpen: boolean) => void;
    open?: boolean;
  } = $props();

  const getDefaultOpen = () => defaultOpen;
  let uncontrolledOpen = $state(getDefaultOpen());

  const slots = $derived.by(() =>
    normalizeVariantResult(tooltipVariants(), "tooltip"),
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

  // Bits UI does not expose a separate close delay prop; keep the value accepted
  // so the v3 API surface remains stable while the wrapper stays typed.
  const getCloseDelay = () => closeDelay;
  void getCloseDelay();

  setTooltipContext({
    get slots() {
      return slots;
    },
  });
</script>

<BitsTooltip.Provider delayDuration={delay} disabled={isDisabled}>
  <BitsTooltip.Root
    delayDuration={delay}
    disabled={isDisabled}
    onOpenChange={handleOpenChange}
    open={currentOpen}
  >
    {@render children?.()}
  </BitsTooltip.Root>
</BitsTooltip.Provider>
