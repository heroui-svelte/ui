<script lang="ts">
  import type {Snippet} from "svelte";

  import type {ProgressCircleVariants} from "@heroui-svelte/styles";

  import {progressCircleVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setProgressCircleContext} from "./context";

  const STROKE_WIDTH = 4;
  const CENTER = 18;
  const RADIUS = CENTER - STROKE_WIDTH / 2;
  const VIEW_BOX_SIZE = CENTER * 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  let {
    children,
    class: className = "",
    color,
    isDisabled = false,
    isIndeterminate = false,
    maxValue = 100,
    minValue = 0,
    size,
    value = 0,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    color?: ProgressCircleVariants["color"];
    isDisabled?: boolean;
    isIndeterminate?: boolean;
    maxValue?: number;
    minValue?: number;
    size?: ProgressCircleVariants["size"];
    value?: number;
    [key: string]: any;
  } = $props();

  const clampValue = (nextValue: number, min: number, max: number) =>
    Math.min(max, Math.max(min, nextValue));

  const clampedValue = $derived(clampValue(value, minValue, maxValue));
  const percentage = $derived.by(() => {
    const range = maxValue - minValue;

    if (range <= 0) {
      return 0;
    }

    return ((clampedValue - minValue) / range) * 100;
  });
  const slots = $derived.by(
    () => normalizeVariantResult(progressCircleVariants({color, size}), "progress-circle"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "progress-circle");

  setProgressCircleContext({
    get isIndeterminate() {
      return isIndeterminate;
    },
    get percentage() {
      return percentage;
    },
    get slots() {
      return slots;
    },
  });
</script>

<div
  aria-valuemax={maxValue}
  aria-valuemin={minValue}
  aria-valuenow={isIndeterminate ? undefined : clampedValue}
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-slot="progress-circle"
  data-stroke-width={STROKE_WIDTH}
  data-view-box-size={VIEW_BOX_SIZE}
  role="progressbar"
  {...restProps}
>
  {@render children?.()}
</div>
