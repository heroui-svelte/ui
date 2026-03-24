<script lang="ts">
  import type {Snippet} from "svelte";

  import {Popover as BitsPopover} from "bits-ui";

  import {colorPickerVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {parseColor, resolveColor} from "../../internal/color";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setColorPickerContext} from "./context";

  let {
    children,
    class: className = "",
    defaultOpen = false,
    defaultValue,
    isOpen,
    name,
    onChange,
    onOpenChange,
    onValueChange,
    open,
    value,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultOpen?: boolean;
    defaultValue?: string;
    isOpen?: boolean;
    name?: string;
    onChange?: (value: ReturnType<typeof resolveColor>) => void;
    onOpenChange?: (nextOpen: boolean) => void;
    onValueChange?: (value: ReturnType<typeof resolveColor>) => void;
    open?: boolean;
    value?: string;
    [key: string]: any;
  } = $props();

  const getDefaultOpen = () => defaultOpen;
  const getDefaultColor = () => parseColor(defaultValue ?? "#0485F7");
  let uncontrolledOpen = $state(getDefaultOpen());
  let uncontrolledColor = $state(getDefaultColor());

  const slots = $derived.by(
    () => normalizeVariantResult(colorPickerVariants(), "color-picker"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "color-picker");
  const currentOpen = $derived(
    isOpen === undefined ? (open === undefined ? uncontrolledOpen : open) : isOpen,
  );
  const currentColor = $derived(
    value === undefined ? (uncontrolledColor ?? resolveColor("#0485F7")) : resolveColor(value),
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (isOpen === undefined && open === undefined) {
      uncontrolledOpen = nextOpen;
    }

    onOpenChange?.(nextOpen);
  };

  const setColor = (nextColorValue: string | ReturnType<typeof resolveColor> | null | undefined) => {
    const nextColor = parseColor(nextColorValue);

    if (!nextColor) {
      return;
    }

    if (value === undefined) {
      uncontrolledColor = nextColor;
    }

    onValueChange?.(nextColor);
    onChange?.(nextColor);
  };

  setColorPickerContext({
    get color() {
      return currentColor;
    },
    get open() {
      return currentOpen;
    },
    setColor,
    get slots() {
      return slots;
    },
  });
</script>

<BitsPopover.Root onOpenChange={handleOpenChange} open={currentOpen}>
  <div class={cn(rootClass, className)} data-slot="color-picker" {...restProps}>
    {@render children?.()}
    {#if name}
      <input name={name} type="hidden" value={currentColor.toString("hex")} />
    {/if}
  </div>
</BitsPopover.Root>
