<script module lang="ts">
  let searchFieldInstanceCount = 0;
</script>

<script lang="ts">
  import type {Snippet} from "svelte";
  import type {SearchFieldVariants} from "@heroui-svelte/styles";

  import {searchFieldVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setSearchFieldContext} from "./context";

  let {
    children,
    class: className = "",
    defaultValue,
    disabled,
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
    type = "search",
    value,
    variant = "primary",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    fullWidth?: SearchFieldVariants["fullWidth"];
    id?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    name?: string;
    onChange?: (value: string) => void;
    onValueChange?: (value: string) => void;
    required?: boolean;
    type?: string;
    value?: string | number;
    variant?: SearchFieldVariants["variant"];
    [key: string]: any;
  } = $props();

  const instanceId = `search-field-${++searchFieldInstanceCount}`;
  const getDefaultValue = () =>
    defaultValue === undefined ? "" : String(defaultValue);

  let uncontrolledValue = $state(getDefaultValue());
  let hasDescription = $state(false);
  let hasError = $state(false);
  let inputElement = $state<HTMLInputElement | null>(null);

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        searchFieldVariants({
          fullWidth,
          variant,
        }),
        "search-field",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "search-field");
  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled));
  const effectiveRequired = $derived(Boolean(required ?? isRequired));
  const controlledValue = $derived(value === undefined ? undefined : String(value));
  const currentValue = $derived(controlledValue ?? uncontrolledValue);
  const inputId = $derived(id ?? `${instanceId}-input`);
  const descriptionId = $derived(`${inputId}-description`);
  const errorMessageId = $derived(`${inputId}-error`);
  const describedBy = $derived(
    [
      hasDescription ? descriptionId : undefined,
      hasError ? errorMessageId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined,
  );

  const setValue = (nextValue: string) => {
    if (controlledValue === undefined) {
      uncontrolledValue = nextValue;
    }

    onValueChange?.(nextValue);
    onChange?.(nextValue);
  };

  const clear = () => {
    if (effectiveDisabled || isReadOnly) {
      return;
    }

    if (inputElement) {
      if (inputElement.value !== "") {
        inputElement.value = "";
      }

      inputElement.dispatchEvent(new Event("input", {bubbles: true}));
      inputElement.focus();

      return;
    }

    setValue("");
  };

  setSearchFieldContext({
    clear,
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
      return effectiveDisabled;
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
    setHasError(present: boolean) {
      hasError = present;
    },
    setInputElement(element: HTMLInputElement | null) {
      inputElement = element;
    },
    setValue,
    get slots() {
      return slots;
    },
    get type() {
      return type;
    },
    get value() {
      return currentValue;
    },
  });
</script>

<div
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-empty={withDataState(currentValue.length === 0)}
  data-invalid={withDataState(isInvalid)}
  data-readonly={withDataState(isReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-slot="search-field"
  {...restProps}
>
  {@render children?.()}
</div>
