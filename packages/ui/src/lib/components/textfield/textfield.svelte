<script module lang="ts">
  let textFieldInstanceCount = 0;
</script>

<script lang="ts">
  import type {Snippet} from "svelte";
  import type {TextFieldVariants} from "@heroui-svelte/styles";

  import {textFieldVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setTextFieldContext} from "./context";

  let {
    children,
    class: className = "",
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
    type,
    value,
    variant = "primary",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultValue?: string | number;
    fullWidth?: TextFieldVariants["fullWidth"];
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
    variant?: "primary" | "secondary";
    [key: string]: any;
  } = $props();

  const instanceId = `textfield-${++textFieldInstanceCount}`;
  const getDefaultValue = () =>
    defaultValue === undefined ? undefined : String(defaultValue);

  let uncontrolledValue = $state<string | undefined>(getDefaultValue());
  let hasDescription = $state(false);
  let hasErrorMessage = $state(false);

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        textFieldVariants({
          fullWidth,
        }),
        "textfield",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "textfield");
  const effectiveDisabled = $derived(Boolean(isDisabled));
  const effectiveRequired = $derived(Boolean(required ?? isRequired));
  const controlledValue = $derived(value === undefined ? undefined : String(value));
  const currentValue = $derived(controlledValue ?? uncontrolledValue);
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

  const setValue = (nextValue: string) => {
    if (controlledValue === undefined) {
      uncontrolledValue = nextValue;
    }

    onValueChange?.(nextValue);
    onChange?.(nextValue);
  };

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
    setHasErrorMessage(present: boolean) {
      hasErrorMessage = present;
    },
    setValue,
    get type() {
      return type;
    },
    get value() {
      return currentValue;
    },
    get variant() {
      return variant;
    },
  });
</script>

<div
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-invalid={withDataState(isInvalid)}
  data-readonly={withDataState(isReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-slot="textfield"
  {...restProps}
>
  {@render children?.()}
</div>
