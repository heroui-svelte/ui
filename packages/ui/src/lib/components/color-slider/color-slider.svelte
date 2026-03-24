<script lang="ts">
  import type {Snippet} from "svelte";
  import type {ColorSliderVariants} from "@heroui-svelte/styles";

  import {colorSliderVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {
    getChannelValueLabel,
    getColorChannelRange,
    getSliderTrackBackground,
    normalizeColorSpaceForChannel,
    parseColor,
    resolveColor,
  } from "../../internal/color";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getColorPickerContext} from "../color-picker/context";
  import {setColorSliderContext} from "./context";

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  let {
    children,
    channel,
    class: className = "",
    colorSpace,
    defaultValue,
    isDisabled = false,
    onChange,
    onValueChange,
    orientation = "horizontal",
    value,
    ...restProps
  }: {
    channel: "alpha" | "blue" | "brightness" | "green" | "hue" | "lightness" | "red" | "saturation";
    children?: Snippet;
    class?: string;
    colorSpace?: "hsb" | "hsl" | "rgb";
    defaultValue?: string;
    isDisabled?: boolean;
    onChange?: (value: ReturnType<typeof resolveColor>) => void;
    onValueChange?: (value: ReturnType<typeof resolveColor>) => void;
    orientation?: "horizontal" | "vertical";
    value?: string;
    [key: string]: any;
  } = $props();

  const pickerContext = safeGetContext(getColorPickerContext);
  const getDefaultColor = () =>
    parseColor(defaultValue ?? pickerContext?.color?.toString("hex") ?? "#0485F7");
  let trackElement = $state<HTMLElement | null>(null);
  let uncontrolledColor = $state(getDefaultColor());
  let isDragging = $state(false);
  let activePointerId = $state<number | null>(null);
  let isFocusVisible = $state(false);

  const usesPickerState = $derived(value === undefined && defaultValue === undefined && Boolean(pickerContext?.color));
  const currentColor = $derived(
    value !== undefined
      ? resolveColor(value)
      : usesPickerState
        ? resolveColor(pickerContext?.color)
        : resolveColor(uncontrolledColor),
  );
  const resolvedColorSpace = $derived(
    normalizeColorSpaceForChannel(channel, colorSpace, console.warn),
  );
  const range = $derived(getColorChannelRange(channel));
  const channelValue = $derived(
    currentColor.getChannelValue(channel, resolvedColorSpace),
  );
  const progress = $derived(
    (channelValue - range.minValue) / (range.maxValue - range.minValue || 1),
  );
  const trackBackground = $derived(
    getSliderTrackBackground(currentColor, channel, resolvedColorSpace, orientation),
  );
  const thumbStyle = $derived.by(() => {
    const placement =
      orientation === "vertical"
        ? `bottom: ${clamp(progress, 0, 1) * 100}%; transform: translate(-50%, 50%)`
        : `left: ${clamp(progress, 0, 1) * 100}%; transform: translate(-50%, -50%)`;
    const backgroundColor = isDisabled ? "" : `background-color: ${currentColor.toString("css")}`;

    return [placement, backgroundColor].filter(Boolean).join("; ");
  });
  const trackStyle = $derived.by(() =>
    [
      `background: ${trackBackground.background}, repeating-conic-gradient(#efefef 0% 25%, #f7f7f7 0% 50%) 50% / 16px 16px`,
      `--track-start-color: ${trackBackground.start}`,
      `--track-end-color: ${trackBackground.end}`,
    ].join("; "),
  );
  const outputValue = $derived(
    getChannelValueLabel(currentColor, channel, resolvedColorSpace),
  );

  const slots = $derived.by(
    () => normalizeVariantResult(colorSliderVariants({}), "color-slider"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "color-slider");

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

  const updateFromPointer = (pointerX: number, pointerY: number) => {
    if (!trackElement || isDisabled) {
      return;
    }

    const rect = trackElement.getBoundingClientRect();
    const ratio =
      orientation === "vertical"
        ? clamp(1 - (pointerY - rect.top) / rect.height, 0, 1)
        : clamp((pointerX - rect.left) / rect.width, 0, 1);
    const nextValue = range.minValue + ratio * (range.maxValue - range.minValue);

    setColor(currentColor.withChannelValue(channel, nextValue, resolvedColorSpace));
  };

  const handleTrackPointerStart = (event: PointerEvent) => {
    if (isDisabled) {
      return;
    }

    event.preventDefault();
    isDragging = true;
    activePointerId = event.pointerId;
    updateFromPointer(event.clientX, event.clientY);
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

  const handleTrackKeydown = (event: KeyboardEvent) => {
    if (isDisabled) {
      return;
    }

    const step = channel === "hue" ? 1 : 1;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault();
        setColor(currentColor.withChannelValue(channel, channelValue - step, resolvedColorSpace));
        break;
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();
        setColor(currentColor.withChannelValue(channel, channelValue + step, resolvedColorSpace));
        break;
      case "Home":
        event.preventDefault();
        setColor(currentColor.withChannelValue(channel, range.minValue, resolvedColorSpace));
        break;
      case "End":
        event.preventDefault();
        setColor(currentColor.withChannelValue(channel, range.maxValue, resolvedColorSpace));
        break;
      default:
        break;
    }
  };

  setColorSliderContext({
    get channel() {
      return channel;
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
    get onTrackKeydown() {
      return handleTrackKeydown;
    },
    get onTrackPointerStart() {
      return handleTrackPointerStart;
    },
    get orientation() {
      return orientation;
    },
    get outputValue() {
      return outputValue;
    },
    registerTrack(node) {
      trackElement = node;
    },
    setColor,
    setFocusVisible(visible) {
      isFocusVisible = visible;
    },
    get slots() {
      return slots;
    },
    get thumbColor() {
      return currentColor.toString("css");
    },
    get thumbStyle() {
      return thumbStyle;
    },
    get trackStyle() {
      return trackStyle;
    },
  });
</script>

<svelte:window
  onpointermove={handleWindowPointerMove}
  onpointerup={(event) => stopDragging(event.pointerId)}
  onpointercancel={(event) => stopDragging(event.pointerId)}
/>

<div
  aria-disabled={isDisabled ? "true" : undefined}
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-orientation={orientation}
  data-slot="color-slider"
  {...restProps}
>
  {@render children?.()}
</div>
