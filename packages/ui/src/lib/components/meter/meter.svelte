<script lang="ts">
  import type {Snippet} from "svelte";

  import type {MeterVariants} from "@heroui-svelte/styles";

  import {meterVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setMeterContext} from "./context";

  let {
    children,
    class: className = "",
    color,
    formatOptions,
    isDisabled = false,
    maxValue = 100,
    minValue = 0,
    size,
    value = 0,
    valueText,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    color?: MeterVariants["color"];
    formatOptions?: Intl.NumberFormatOptions;
    isDisabled?: boolean;
    maxValue?: number;
    minValue?: number;
    size?: MeterVariants["size"];
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
    () => normalizeVariantResult(meterVariants({color, size}), "meter"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "meter");

  setMeterContext({
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
  aria-valuenow={clampedValue}
  aria-valuetext={resolvedValueText}
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-slot="meter"
  role="meter"
  {...restProps}
>
  {@render children?.()}
</div>
