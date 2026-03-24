<script lang="ts">
  import type {Snippet} from "svelte";
  import type {ColorAreaVariants} from "@heroui-svelte/styles";

  import {colorAreaVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {
    getColorAreaColorAt,
    getColorChannelRange,
    getDefaultColorSpace,
    normalizeColorSpaceForChannel,
    parseColor,
    resolveColor,
  } from "../../internal/color";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getColorPickerContext} from "../color-picker/context";
  import {setColorAreaContext} from "./context";

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const getResolvedAreaColorSpace = (
    xChannel: "alpha" | "blue" | "brightness" | "green" | "hue" | "lightness" | "red" | "saturation",
    yChannel: "alpha" | "blue" | "brightness" | "green" | "hue" | "lightness" | "red" | "saturation",
    colorSpace?: "hsb" | "hsl" | "rgb",
  ) => {
    if (colorSpace) {
      return normalizeColorSpaceForChannel(
        yChannel,
        normalizeColorSpaceForChannel(xChannel, colorSpace, console.warn),
        console.warn,
      ) ?? colorSpace;
    }

    if (
      xChannel === "brightness" ||
      yChannel === "brightness"
    ) {
      return "hsb";
    }

    if (
      xChannel === "lightness" ||
      yChannel === "lightness"
    ) {
      return "hsl";
    }

    if (
      xChannel === "red" ||
      xChannel === "green" ||
      xChannel === "blue" ||
      yChannel === "red" ||
      yChannel === "green" ||
      yChannel === "blue"
    ) {
      return "rgb";
    }

    return getDefaultColorSpace(xChannel);
  };

  const getAreaBackground = (
    color: ReturnType<typeof resolveColor>,
    colorSpace: "hsb" | "hsl" | "rgb",
    xChannel: "alpha" | "blue" | "brightness" | "green" | "hue" | "lightness" | "red" | "saturation",
    yChannel: "alpha" | "blue" | "brightness" | "green" | "hue" | "lightness" | "red" | "saturation",
  ) => {
    if (colorSpace === "hsb" && xChannel === "saturation" && yChannel === "brightness") {
      const vividColor = color
        .withChannelValue("saturation", 100, "hsb")
        .withChannelValue("brightness", 100, "hsb")
        .toString("css");

      return `linear-gradient(to top, rgb(0, 0, 0), transparent), linear-gradient(to right, rgb(255, 255, 255), ${vividColor})`;
    }

    const xRange = getColorChannelRange(xChannel);
    const yRange = getColorChannelRange(yChannel);
    const leftColor = color.withChannelValue(xChannel, xRange.minValue, colorSpace).toString("css");
    const rightColor = color.withChannelValue(xChannel, xRange.maxValue, colorSpace).toString("css");
    const topColor = color.withChannelValue(yChannel, yRange.maxValue, colorSpace).toString("css");
    const bottomColor = color.withChannelValue(yChannel, yRange.minValue, colorSpace).toString("css");

    return `linear-gradient(to top, ${bottomColor}, ${topColor}), linear-gradient(to right, ${leftColor}, ${rightColor})`;
  };

  let {
    children,
    class: className = "",
    colorSpace,
    defaultValue,
    isDisabled = false,
    onChange,
    onValueChange,
    showDots = false,
    value,
    xChannel = "saturation",
    yChannel = "brightness",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    colorSpace?: "hsb" | "hsl" | "rgb";
    defaultValue?: string;
    isDisabled?: boolean;
    onChange?: (value: ReturnType<typeof resolveColor>) => void;
    onValueChange?: (value: ReturnType<typeof resolveColor>) => void;
    showDots?: ColorAreaVariants["showDots"];
    value?: string;
    xChannel?: "alpha" | "blue" | "brightness" | "green" | "hue" | "lightness" | "red" | "saturation";
    yChannel?: "alpha" | "blue" | "brightness" | "green" | "hue" | "lightness" | "red" | "saturation";
    [key: string]: any;
  } = $props();

  const pickerContext = safeGetContext(getColorPickerContext);
  const getDefaultColor = () =>
    parseColor(defaultValue ?? pickerContext?.color?.toString("hex") ?? "#0485F7");
  let rootElement = $state<HTMLButtonElement | null>(null);
  let isDragging = $state(false);
  let isFocusVisible = $state(false);
  let activePointerId = $state<number | null>(null);
  let uncontrolledColor = $state(getDefaultColor());

  const usesPickerState = $derived(value === undefined && defaultValue === undefined && Boolean(pickerContext?.color));
  const currentColor = $derived(
    value !== undefined
      ? resolveColor(value)
      : usesPickerState
        ? resolveColor(pickerContext?.color)
        : resolveColor(uncontrolledColor),
  );
  const resolvedColorSpace = $derived(
    getResolvedAreaColorSpace(xChannel, yChannel, colorSpace),
  );
  const xRange = $derived(getColorChannelRange(xChannel));
  const yRange = $derived(getColorChannelRange(yChannel));
  const xPercent = $derived(
    (currentColor.getChannelValue(xChannel, resolvedColorSpace) - xRange.minValue) /
      (xRange.maxValue - xRange.minValue || 1),
  );
  const yPercent = $derived(
    1 -
      (currentColor.getChannelValue(yChannel, resolvedColorSpace) - yRange.minValue) /
        (yRange.maxValue - yRange.minValue || 1),
  );
  const background = $derived(
    getAreaBackground(currentColor, resolvedColorSpace, xChannel, yChannel),
  );

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        colorAreaVariants({
          showDots,
        }),
        "color-area",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "color-area");

  const updateColor = (nextColorValue: string | ReturnType<typeof resolveColor> | null | undefined) => {
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

  const updateFromPointer = (pointerX: number, pointerY: number) => {
    if (!rootElement || isDisabled) {
      return;
    }

    const rect = rootElement.getBoundingClientRect();
    const x = clamp((pointerX - rect.left) / rect.width, 0, 1);
    const y = clamp(1 - (pointerY - rect.top) / rect.height, 0, 1);
    const nextColor = getColorAreaColorAt(
      currentColor,
      xChannel,
      yChannel,
      x,
      y,
      resolvedColorSpace,
    );

    updateColor(nextColor);
  };

  const handlePointerStart = (event: PointerEvent) => {
    if (isDisabled) {
      return;
    }

    event.preventDefault();
    activePointerId = event.pointerId;
    isDragging = true;
    updateFromPointer(event.clientX, event.clientY);
    rootElement?.focus();
  };

  const handleWindowPointerMove = (event: PointerEvent) => {
    if (!isDragging || activePointerId !== event.pointerId) {
      return;
    }

    updateFromPointer(event.clientX, event.clientY);
  };

  const stopDragging = (pointerId?: number) => {
    if (pointerId !== undefined && activePointerId !== pointerId) {
      return;
    }

    isDragging = false;
    activePointerId = null;
  };

  const handleAreaKeydown = (event: KeyboardEvent) => {
    if (isDisabled) {
      return;
    }

    const xStep = (xRange.maxValue - xRange.minValue) / 100;
    const yStep = (yRange.maxValue - yRange.minValue) / 100;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        updateColor(currentColor.withChannelValue(xChannel, currentColor.getChannelValue(xChannel, resolvedColorSpace) - xStep, resolvedColorSpace));
        break;
      case "ArrowRight":
        event.preventDefault();
        updateColor(currentColor.withChannelValue(xChannel, currentColor.getChannelValue(xChannel, resolvedColorSpace) + xStep, resolvedColorSpace));
        break;
      case "ArrowDown":
        event.preventDefault();
        updateColor(currentColor.withChannelValue(yChannel, currentColor.getChannelValue(yChannel, resolvedColorSpace) - yStep, resolvedColorSpace));
        break;
      case "ArrowUp":
        event.preventDefault();
        updateColor(currentColor.withChannelValue(yChannel, currentColor.getChannelValue(yChannel, resolvedColorSpace) + yStep, resolvedColorSpace));
        break;
      default:
        break;
    }
  };

  const thumbStyle = $derived.by(() =>
    [
      `left: ${clamp(xPercent, 0, 1) * 100}%`,
      `top: ${clamp(yPercent, 0, 1) * 100}%`,
      `transform: translate(-50%, -50%)`,
      `--color-area-thumb-color: ${currentColor.toString("css")}`,
    ].join("; "),
  );
  const rootStyle = $derived(`--color-area-background: ${background}`);

  setColorAreaContext({
    get background() {
      return background;
    },
    get color() {
      return currentColor;
    },
    get colorSpace() {
      return resolvedColorSpace;
    },
    get isDisabled() {
      return isDisabled;
    },
    get isDragging() {
      return isDragging;
    },
    get isFocusVisible() {
      return isFocusVisible;
    },
    get onAreaKeydown() {
      return handleAreaKeydown;
    },
    get onPointerStart() {
      return handlePointerStart;
    },
    setColor: updateColor,
    get slots() {
      return slots;
    },
    get thumbColor() {
      return currentColor.toString("css");
    },
    get thumbStyle() {
      return thumbStyle;
    },
    get xChannel() {
      return xChannel;
    },
    get yChannel() {
      return yChannel;
    },
  });
</script>

<svelte:window
  onpointermove={handleWindowPointerMove}
  onpointerup={(event) => stopDragging(event.pointerId)}
  onpointercancel={(event) => stopDragging(event.pointerId)}
/>

<button
  bind:this={rootElement}
  class={cn(rootClass, "appearance-none border-0 p-0 text-left", className)}
  data-disabled={withDataState(isDisabled)}
  data-focus-visible={withDataState(isFocusVisible)}
  data-slot="color-area"
  disabled={isDisabled}
  onblur={() => {
    isFocusVisible = false;
  }}
  onfocus={() => {
    isFocusVisible = true;
  }}
  onkeydown={handleAreaKeydown}
  onpointerdown={handlePointerStart}
  style={rootStyle}
  tabindex={isDisabled ? undefined : 0}
  type="button"
  {...restProps}
>
  {@render children?.()}
</button>
