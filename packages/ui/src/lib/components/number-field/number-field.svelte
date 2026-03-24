<script module lang="ts">
  let numberFieldInstanceCount = 0;
</script>

<script lang="ts">
  import type {Snippet} from "svelte";
  import type {NumberFieldVariants} from "@heroui-svelte/styles";

  import {numberFieldVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setNumberFieldContext} from "./context";
  import {
    clampNumberValue,
    formatNumberValue,
    getNumberFieldInputMode,
    isValueOutOfRange,
    parseNumberValue,
    stepNumberValue,
  } from "./utils";

  let {
    children,
    class: className = "",
    defaultValue,
    formatOptions,
    fullWidth = false,
    id,
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
    isRequired = false,
    maxValue,
    minValue,
    name,
    onChange,
    onValueChange,
    required,
    step = 1,
    value,
    variant = "primary",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultValue?: number;
    formatOptions?: Intl.NumberFormatOptions;
    fullWidth?: NumberFieldVariants["fullWidth"];
    id?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    maxValue?: number;
    minValue?: number;
    name?: string;
    onChange?: (value: number | undefined) => void;
    onValueChange?: (value: number | undefined) => void;
    required?: boolean;
    step?: number;
    value?: number;
    variant?: NumberFieldVariants["variant"];
    [key: string]: any;
  } = $props();

  const instanceId = `number-field-${++numberFieldInstanceCount}`;
  const getDefaultValue = () => defaultValue;
  const getInitialDisplayValue = () =>
    formatNumberValue(value ?? defaultValue, formatOptions);

  let rootElement = $state<HTMLDivElement | null>(null);
  let inputElement = $state<HTMLInputElement | null>(null);
  let uncontrolledValue = $state<number | undefined>(getDefaultValue());
  let displayValue = $state(getInitialDisplayValue());
  let isFocused = $state(false);
  let labelId = $state<string | undefined>(undefined);
  let descriptionIds = $state<string[]>([]);
  let errorIds = $state<string[]>([]);

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        numberFieldVariants({
          fullWidth,
          variant,
        }),
        "number-field",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "number-field");
  const currentValue = $derived(value === undefined ? uncontrolledValue : value);
  const normalizedStep = $derived(Number.isFinite(step) && step > 0 ? step : 1);
  const effectiveRequired = $derived(Boolean(required ?? isRequired));
  const effectiveInvalid = $derived(
    Boolean(isInvalid || isValueOutOfRange(currentValue, minValue, maxValue)),
  );
  const inputId = $derived(id ?? `${instanceId}-input`);
  const describedBy = $derived([...descriptionIds, ...errorIds].join(" ") || undefined);
  const inputMode = $derived(getNumberFieldInputMode(normalizedStep, formatOptions));
  const canIncrement = $derived(
    !isDisabled &&
      !isReadOnly &&
      (maxValue === undefined || currentValue === undefined || currentValue < maxValue),
  );
  const canDecrement = $derived(
    !isDisabled &&
      !isReadOnly &&
      (minValue === undefined || currentValue === undefined || currentValue > minValue),
  );

  const syncDisplayValue = (nextValue: number | undefined) => {
    displayValue = formatNumberValue(nextValue, formatOptions);
  };

  const commitValue = (
    nextValue: number | undefined,
    options: {
      syncDisplay?: boolean;
    } = {},
  ) => {
    const previousValue = currentValue;

    if (value === undefined) {
      uncontrolledValue = nextValue;
    }

    if (!Object.is(nextValue, previousValue)) {
      onValueChange?.(nextValue);
      onChange?.(nextValue);
    }

    if (options.syncDisplay) {
      syncDisplayValue(nextValue);
    }
  };

  const handleInput = (nextValue: string) => {
    displayValue = nextValue;

    if (!nextValue.trim()) {
      commitValue(undefined);
      return;
    }

    const parsedValue = parseNumberValue(nextValue, formatOptions);

    if (parsedValue === undefined) {
      return;
    }

    commitValue(parsedValue);
  };

  const handleFocus = () => {
    isFocused = true;
  };

  const handleBlur = () => {
    isFocused = false;

    if (!displayValue.trim()) {
      commitValue(undefined, {syncDisplay: true});
      return;
    }

    const parsedValue = parseNumberValue(displayValue, formatOptions);

    if (parsedValue === undefined) {
      syncDisplayValue(currentValue);
      return;
    }

    const nextValue = clampNumberValue(parsedValue, minValue, maxValue);
    commitValue(nextValue, {syncDisplay: true});
  };

  const focusInput = () => {
    inputElement?.focus();
  };

  const registerInputElement = (element: HTMLInputElement | null) => {
    inputElement = element;
  };

  const stepBy = (delta: number) => {
    if (isDisabled || isReadOnly) {
      return;
    }

    const nextValue = stepNumberValue(
      currentValue,
      delta,
      normalizedStep,
      minValue,
      maxValue,
    );

    commitValue(nextValue, {syncDisplay: true});
    focusInput();
  };

  const ensureElementId = (element: HTMLElement, suffix: string) => {
    if (!element.id) {
      element.id = `${instanceId}-${suffix}`;
    }

    return element.id;
  };

  const collectFieldIds = () => {
    if (!rootElement) {
      return;
    }

    const labelElement = rootElement.querySelector<HTMLElement>('[data-slot="label"]');
    const descriptionElements = Array.from(
      rootElement.querySelectorAll<HTMLElement>('[data-slot="description"]'),
    );
    const errorElements = Array.from(
      rootElement.querySelectorAll<HTMLElement>('[data-slot="field-error"]'),
    );

    labelId = labelElement ? ensureElementId(labelElement, "label") : undefined;
    descriptionIds = descriptionElements.map((element, index) =>
      ensureElementId(element, `description-${index}`),
    );
    errorIds = errorElements.map((element, index) =>
      ensureElementId(element, `error-${index}`),
    );
  };

  $effect(() => {
    if (isFocused) {
      return;
    }

    syncDisplayValue(currentValue);
  });

  $effect(() => {
    if (!rootElement) {
      return;
    }

    collectFieldIds();

    const observer = new MutationObserver(() => {
      collectFieldIds();
    });

    observer.observe(rootElement, {
      attributeFilter: ["id"],
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  });

  setNumberFieldContext({
    get canDecrement() {
      return canDecrement;
    },
    get canIncrement() {
      return canIncrement;
    },
    get describedBy() {
      return describedBy;
    },
    get displayValue() {
      return displayValue;
    },
    focusInput,
    get formatOptions() {
      return formatOptions;
    },
    handleBlur,
    handleFocus,
    handleInput,
    get inputId() {
      return inputId;
    },
    get inputMode() {
      return inputMode;
    },
    get isDisabled() {
      return isDisabled;
    },
    get isInvalid() {
      return effectiveInvalid;
    },
    get isReadOnly() {
      return isReadOnly;
    },
    get isRequired() {
      return effectiveRequired;
    },
    get labelId() {
      return labelId;
    },
    get maxValue() {
      return maxValue;
    },
    get minValue() {
      return minValue;
    },
    get name() {
      return name;
    },
    registerInputElement,
    setValue: (nextValue) => {
      commitValue(nextValue, {syncDisplay: true});
    },
    get slots() {
      return slots;
    },
    stepBy,
    get value() {
      return currentValue;
    },
  });
</script>

<div
  bind:this={rootElement}
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-invalid={withDataState(effectiveInvalid)}
  data-readonly={withDataState(isReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-slot="number-field"
  {...restProps}
>
  {@render children?.()}
</div>
