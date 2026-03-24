<script lang="ts">
  import type {Snippet} from "svelte";

  import type {ProgressBarVariants} from "@heroui-svelte/styles";

  import {progressBarVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setProgressBarContext} from "./context";

  let {
    children,
    class: className = "",
    color,
    formatOptions,
    isDisabled = false,
    isIndeterminate = false,
    maxValue = 100,
    minValue = 0,
    size,
    value = 0,
    valueText,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    color?: ProgressBarVariants["color"];
    formatOptions?: Intl.NumberFormatOptions;
    isDisabled?: boolean;
    isIndeterminate?: boolean;
    maxValue?: number;
    minValue?: number;
    size?: ProgressBarVariants["size"];
    value?: number;
    valueText?: string;
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
  const resolvedValueText = $derived.by(() => {
    if (valueText) {
      return valueText;
    }

    if (formatOptions) {
      return new Intl.NumberFormat(undefined, formatOptions).format(clampedValue);
    }

    return `${Math.round(percentage)}%`;
  });
  const slots = $derived.by(
    () => normalizeVariantResult(progressBarVariants({color, size}), "progress-bar"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "progress-bar");

  setProgressBarContext({
    get isIndeterminate() {
      return isIndeterminate;
    },
    get percentage() {
      return percentage;
    },
    get slots() {
      return slots;
    },
    get valueText() {
      return resolvedValueText;
    },
  });
</script>

<div
  aria-valuemax={maxValue}
  aria-valuemin={minValue}
  aria-valuenow={isIndeterminate ? undefined : clampedValue}
  aria-valuetext={isIndeterminate ? undefined : resolvedValueText}
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-slot="progress-bar"
  role="progressbar"
  {...restProps}
>
  {@render children?.()}
</div>
