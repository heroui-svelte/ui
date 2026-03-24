<script lang="ts">
  import type {Snippet} from "svelte";
  import type {ColorSwatchPickerVariants} from "@heroui-svelte/styles";

  import {colorSwatchPickerVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {parseColor, resolveColor} from "../../internal/color";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getColorPickerContext} from "../color-picker/context";
  import {setColorSwatchPickerContext} from "./context";

  let {
    children,
    class: className = "",
    defaultValue,
    isDisabled = false,
    layout = "grid",
    onChange,
    onValueChange,
    value,
    variant = "circle",
    size = "md",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultValue?: string;
    isDisabled?: boolean;
    layout?: ColorSwatchPickerVariants["layout"];
    onChange?: (value: ReturnType<typeof resolveColor>) => void;
    onValueChange?: (value: ReturnType<typeof resolveColor>) => void;
    size?: ColorSwatchPickerVariants["size"];
    value?: string;
    variant?: ColorSwatchPickerVariants["variant"];
    [key: string]: any;
  } = $props();

  const pickerContext = safeGetContext(getColorPickerContext);
  const getDefaultColor = () =>
    parseColor(defaultValue ?? pickerContext?.color?.toString("hex") ?? null);
  let uncontrolledColor = $state(getDefaultColor());
  const usesPickerState = $derived(value === undefined && defaultValue === undefined && Boolean(pickerContext?.color));
  const currentColor = $derived(
    value !== undefined
      ? parseColor(value)
      : usesPickerState
        ? (pickerContext?.color ?? null)
        : uncontrolledColor,
  );

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        colorSwatchPickerVariants({
          layout,
          size,
          variant,
        }),
        "color-swatch-picker",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "color-swatch-picker");

  const setColor = (nextColorValue: string | ReturnType<typeof resolveColor> | null | undefined) => {
    const nextColor = parseColor(nextColorValue);

    if (!nextColor) {
      return;
    }

    if (usesPickerState) {
      pickerContext?.setColor?.(nextColor);
    } else if (value === undefined) {
      uncontrolledColor = nextColor;
    }

    onValueChange?.(nextColor);
    onChange?.(nextColor);
  };

  setColorSwatchPickerContext({
    get color() {
      return currentColor;
    },
    get isDisabled() {
      return isDisabled;
    },
    setColor,
    get slots() {
      return slots;
    },
  });
</script>

<div
  aria-disabled={isDisabled ? "true" : undefined}
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-slot="color-swatch-picker"
  role={restProps.role ?? "radiogroup"}
  {...restProps}
>
  {@render children?.()}
</div>
