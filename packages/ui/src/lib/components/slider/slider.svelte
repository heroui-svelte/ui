<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {sliderVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setSliderContext} from "./context";

  let {
    children,
    class: className = "",
    defaultValue,
    formatOptions,
    isDisabled = false,
    maxValue,
    minValue,
    onChange,
    onValueChange,
    onValueCommit,
    orientation = "horizontal",
    step,
    type,
    value,
    ...restProps
  }: {
    children?: Snippet<[{
      ticks: number[];
      thumbs: number[];
      values: number[];
    }]>;
    class?: string;
    defaultValue?: number | number[];
    formatOptions?: Intl.NumberFormatOptions;
    isDisabled?: boolean;
    maxValue?: number;
    minValue?: number;
    onChange?: (value: number | number[]) => void;
    onValueChange?: (value: number | number[]) => void;
    onValueCommit?: (value: number | number[]) => void;
    orientation?: "horizontal" | "vertical";
    step?: number;
    type?: "single" | "multiple";
    value?: number | number[];
    [key: string]: any;
  } = $props();

  const inferType = (nextValue?: number | number[]) => {
    if (!Array.isArray(nextValue)) {
      return undefined;
    }

    return nextValue.length > 1 ? "multiple" : "single";
  };

  const getResolvedType = () => type ?? inferType(value) ?? inferType(defaultValue) ?? "single";
  const normalizeValue = (
    nextValue: number | number[] | undefined,
    nextType: "single" | "multiple",
  ) => {
    if (nextType === "multiple") {
      if (Array.isArray(nextValue)) {
        return nextValue;
      }

      return nextValue === undefined ? [] : [nextValue];
    }

    if (Array.isArray(nextValue)) {
      return nextValue[0] ?? 0;
    }

    return nextValue ?? 0;
  };

  let hasInitializedUncontrolledValue = $state(false);
  let uncontrolledValue = $state<number | number[]>(0);

  const slots = $derived.by(() => normalizeVariantResult(sliderVariants({}), "slider"));
  const rootClass = $derived(slots.base?.({}) ?? "slider");
  const resolvedType = $derived(getResolvedType());
  const currentValue = $derived.by(() => {
    if (value !== undefined) {
      return normalizeValue(value, resolvedType);
    }

    return normalizeValue(uncontrolledValue, resolvedType);
  });
  const currentValues = $derived(Array.isArray(currentValue) ? currentValue : [currentValue]);
  const valueFormatter = $derived.by(() => {
    if (!formatOptions) {
      return null;
    }

    return new Intl.NumberFormat(undefined, formatOptions);
  });
  const currentValueLabels = $derived.by(() =>
    currentValues.map((currentItem) => valueFormatter?.format(currentItem) ?? `${currentItem}`),
  );
  const tickCount = $derived.by(() => {
    const min = minValue ?? 0;
    const max = maxValue ?? 100;
    const resolvedStep = step ?? 1;
    const range = Math.max(max - min, 0);

    return Math.floor(range / resolvedStep) + 1;
  });
  const tickIndexes = $derived(Array.from({length: tickCount}, (_, index) => index));
  const thumbIndexes = $derived(currentValues.map((_, index) => index));

  $effect.pre(() => {
    if (hasInitializedUncontrolledValue) {
      return;
    }

    uncontrolledValue = normalizeValue(defaultValue, getResolvedType());
    hasInitializedUncontrolledValue = true;
  });

  const handleValueChange = (nextValue: number | number[]) => {
    if (value === undefined) {
      uncontrolledValue = nextValue;
    }

    onValueChange?.(nextValue);
    onChange?.(nextValue);
  };

  const handleValueCommit = (nextValue: number | number[]) => {
    onValueCommit?.(nextValue);
  };

  setSliderContext({
    get max() {
      return maxValue ?? 100;
    },
    get handleValueChange() {
      return handleValueChange;
    },
    get handleValueCommit() {
      return handleValueCommit;
    },
    get isDisabled() {
      return isDisabled;
    },
    get min() {
      return minValue ?? 0;
    },
    get orientation() {
      return orientation;
    },
    get resolvedType() {
      return resolvedType;
    },
    get step() {
      return step ?? 1;
    },
    get slots() {
      return slots;
    },
    get values() {
      return currentValues;
    },
    get valueLabels() {
      return currentValueLabels;
    },
  });
</script>

<div
  class={cn(rootClass, className)}
  data-disabled={isDisabled ? "true" : undefined}
  data-orientation={orientation}
  data-slot="slider"
  {...restProps}
>
  {@render children?.({ticks: tickIndexes, thumbs: thumbIndexes, values: currentValues})}
</div>
