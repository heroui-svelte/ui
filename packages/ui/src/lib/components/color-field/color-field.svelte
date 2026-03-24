<script module lang="ts">
  let colorFieldInstanceCount = 0;
</script>

<script lang="ts">
  import type {Snippet} from "svelte";
  import type {ColorFieldVariants} from "@heroui-svelte/styles";

  import {colorFieldVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {
    formatColorFieldValue,
    parseColor,
    parseColorFieldInput,
    resolveColor,
  } from "../../internal/color";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getColorPickerContext} from "../color-picker/context";
  import {setTextFieldContext} from "../textfield/context";
  import {setColorFieldContext} from "./context";

  let {
    channel,
    children,
    class: className = "",
    colorSpace,
    defaultValue,
    fullWidth = false,
    id,
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
    isRequired = false,
    name,
    onChange,
    onValueChange,
    required,
    value,
    ...restProps
  }: {
    channel?: "alpha" | "blue" | "brightness" | "green" | "hue" | "lightness" | "red" | "saturation";
    children?: Snippet;
    class?: string;
    colorSpace?: "hsb" | "hsl" | "rgb";
    defaultValue?: string;
    fullWidth?: ColorFieldVariants["fullWidth"];
    id?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    name?: string;
    onChange?: (value: ReturnType<typeof resolveColor>) => void;
    onValueChange?: (value: ReturnType<typeof resolveColor>) => void;
    required?: boolean;
    value?: string | null;
    [key: string]: any;
  } = $props();

  const instanceId = `colorfield-${++colorFieldInstanceCount}`;
  const pickerContext = safeGetContext(getColorPickerContext);
  const getDefaultColor = () =>
    parseColor(defaultValue ?? pickerContext?.color?.toString("hex") ?? null);
  let uncontrolledColor = $state(getDefaultColor());
  let inputValue = $state("");
  let hasDescription = $state(false);
  let hasErrorMessage = $state(false);

  const usesPickerState = $derived(value === undefined && defaultValue === undefined && Boolean(pickerContext?.color));
  const currentColor = $derived(
    value !== undefined
      ? parseColor(value)
      : usesPickerState
        ? (pickerContext?.color ?? null)
        : uncontrolledColor,
  );
  const effectiveRequired = $derived(Boolean(required ?? isRequired));
  const inputId = $derived(id ?? `${instanceId}-input`);
  const descriptionId = $derived(`${inputId}-description`);
  const errorMessageId = $derived(`${inputId}-error`);
  const describedBy = $derived(
    [
      hasDescription ? descriptionId : undefined,
      hasErrorMessage ? errorMessageId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined,
  );

  const slots = $derived.by(
    () => normalizeVariantResult(colorFieldVariants({fullWidth}), "color-field"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "color-field");

  const setColor = (nextColorValue: string | ReturnType<typeof resolveColor> | null | undefined) => {
    const nextColor = parseColor(nextColorValue);

    if (usesPickerState) {
      pickerContext?.setColor?.(nextColor);
    } else if (value === undefined) {
      uncontrolledColor = nextColor;
    }

    if (nextColor) {
      inputValue = formatColorFieldValue(nextColor, channel, colorSpace);
      onValueChange?.(nextColor);
      onChange?.(nextColor);
    } else if (value === undefined && !usesPickerState) {
      uncontrolledColor = null;
      onValueChange?.(resolveColor("#0485F7"));
      onChange?.(resolveColor("#0485F7"));
    }
  };

  const setInputValue = (nextValue: string) => {
    inputValue = nextValue;
    const nextColor = parseColorFieldInput(nextValue, currentColor, channel, colorSpace);

    if (nextColor) {
      setColor(nextColor);
    }
  };

  $effect(() => {
    inputValue = currentColor
      ? formatColorFieldValue(currentColor, channel, colorSpace)
      : "";
  });

  setTextFieldContext({
    get describedBy() {
      return describedBy;
    },
    get descriptionId() {
      return descriptionId;
    },
    get errorMessageId() {
      return errorMessageId;
    },
    get inputId() {
      return inputId;
    },
    get isDisabled() {
      return isDisabled;
    },
    get isInvalid() {
      return isInvalid;
    },
    get isReadOnly() {
      return isReadOnly;
    },
    get isRequired() {
      return effectiveRequired;
    },
    get name() {
      return name;
    },
    setHasDescription(present: boolean) {
      hasDescription = present;
    },
    setHasErrorMessage(present: boolean) {
      hasErrorMessage = present;
    },
    setValue(value: string) {
      setInputValue(value);
    },
    get value() {
      return inputValue;
    },
  });

  setColorFieldContext({
    get channel() {
      return channel;
    },
    get color() {
      return currentColor;
    },
    get colorSpace() {
      return colorSpace;
    },
    get inputValue() {
      return inputValue;
    },
    setColor,
    setInputValue,
  });
</script>

<div
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-invalid={withDataState(isInvalid)}
  data-readonly={withDataState(isReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-slot="color-field"
  {...restProps}
>
  {@render children?.()}
</div>
