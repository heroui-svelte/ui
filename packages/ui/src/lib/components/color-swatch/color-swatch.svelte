<script lang="ts">
  import type {ColorSwatchVariants} from "@heroui-svelte/styles";

  import {colorSwatchVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getColorLuminance, resolveColor} from "../../internal/color";
  import {normalizeVariantResult} from "../../internal/slots";
  import {getColorFieldContext} from "../color-field/context";
  import {getColorPickerContext} from "../color-picker/context";
  import {getColorSwatchPickerItemContext} from "../color-swatch-picker/context";

  type StyleInput =
    | Record<string, string | number | null | undefined>
    | string
    | ((props: {color: ReturnType<typeof resolveColor>}) => Record<string, string | number | null | undefined> | string);

  const serializeStyle = (styleValue: StyleInput | undefined, color: ReturnType<typeof resolveColor>) => {
    if (!styleValue) {
      return "";
    }

    const resolvedStyle =
      typeof styleValue === "function"
        ? styleValue({color})
        : styleValue;

    if (typeof resolvedStyle === "string") {
      return resolvedStyle.trim();
    }

    return Object.entries(resolvedStyle)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => `${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}: ${value};`)
      .join(" ");
  };

  let {
    class: className = "",
    color,
    colorName,
    shape = "circle",
    size = "md",
    style,
    ...restProps
  }: {
    class?: string;
    color?: string;
    colorName?: string;
    shape?: ColorSwatchVariants["shape"];
    size?: ColorSwatchVariants["size"];
    style?: StyleInput;
    [key: string]: any;
  } = $props();

  const pickerContext = safeGetContext(getColorPickerContext);
  const swatchPickerItemContext = safeGetContext(getColorSwatchPickerItemContext);
  const colorFieldContext = safeGetContext(getColorFieldContext);
  const currentColor = $derived(
    resolveColor(
      color ??
        swatchPickerItemContext?.color ??
        colorFieldContext?.color ??
        pickerContext?.color ??
        "#0485F7",
    ),
  );
  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        colorSwatchVariants({shape, size}),
        "color-swatch",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "color-swatch");
  const rootStyle = $derived.by(() => {
    const userStyle = serializeStyle(style, currentColor);

    return [
      `--color-swatch-current: ${currentColor.toString("css")}`,
      userStyle,
    ]
      .filter(Boolean)
      .join("; ");
  });
  const luminance = $derived(getColorLuminance(currentColor));
</script>

<span
  aria-label={colorName ?? restProps["aria-label"]}
  class={cn(rootClass, className)}
  data-light-color={luminance > 0.5 ? "true" : undefined}
  data-slot="color-swatch"
  role={restProps.role ?? "img"}
  style={rootStyle}
  title={colorName}
  {...restProps}
></span>
