<script lang="ts">
  import type {Snippet} from "svelte";
  import type {InputGroupVariants} from "@heroui-svelte/styles";

  import {inputGroupVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getTextFieldContext} from "../textfield/context";
  import {setInputGroupContext} from "./context";

  let {
    children,
    class: className = "",
    defaultValue,
    disabled,
    fullWidth = false,
    id,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    name,
    onChange,
    onValueChange,
    required,
    type,
    value,
    onclick,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    fullWidth?: boolean;
    id?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    name?: string;
    onChange?: (value: string) => void;
    onValueChange?: (value: string) => void;
    onclick?: (event: MouseEvent) => void;
    required?: boolean;
    type?: string;
    value?: string | number;
    variant?: InputGroupVariants["variant"];
    [key: string]: any;
  } = $props();

  const textFieldContext = safeGetContext(getTextFieldContext);
  let groupElement = $state<HTMLDivElement | null>(null);
  const getDefaultValue = () =>
    defaultValue === undefined ? undefined : String(defaultValue);
  let uncontrolledValue = $state(getDefaultValue());
  const resolvedVariant = $derived(variant ?? textFieldContext?.variant ?? "primary");
  const effectiveDisabled = $derived(
    Boolean(disabled ?? isDisabled ?? textFieldContext?.isDisabled),
  );
  const effectiveInvalid = $derived(Boolean(isInvalid || textFieldContext?.isInvalid));
  const effectiveReadOnly = $derived(Boolean(isReadOnly || textFieldContext?.isReadOnly));
  const effectiveRequired = $derived(
    Boolean(required ?? isRequired ?? textFieldContext?.isRequired),
  );
  const controlledValue = $derived(
    value === undefined
      ? textFieldContext?.value
      : String(value),
  );
  const currentValue = $derived(controlledValue ?? uncontrolledValue);
  const resolvedInputId = $derived(id ?? textFieldContext?.inputId);
  const describedBy = $derived(textFieldContext?.describedBy);

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        inputGroupVariants({
          fullWidth,
          variant: resolvedVariant,
        }),
        "input-group",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "input-group");

  const setValue = (nextValue: string) => {
    if (value === undefined && textFieldContext?.value === undefined) {
      uncontrolledValue = nextValue;
    }

    onValueChange?.(nextValue);
    onChange?.(nextValue);
    textFieldContext?.setValue?.(nextValue);
  };

  const handleClick = (event: MouseEvent) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    const input = groupElement?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      '[data-slot="input-group-input"], [data-slot="input-group-textarea"]',
    );
    const interactiveTarget = target?.closest(
      'button, a, input, textarea, select, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])',
    );

    if (
      input &&
      target &&
      !interactiveTarget &&
      target !== input &&
      !input.contains(target)
    ) {
      input.focus();
    }

    onclick?.(event);
  };

  setInputGroupContext({
    get describedBy() {
      return describedBy;
    },
    get inputId() {
      return resolvedInputId;
    },
    get isDisabled() {
      return effectiveDisabled;
    },
    get isInvalid() {
      return effectiveInvalid;
    },
    get isReadOnly() {
      return effectiveReadOnly;
    },
    get isRequired() {
      return effectiveRequired;
    },
    get name() {
      return name ?? textFieldContext?.name;
    },
    setValue,
    get slots() {
      return slots;
    },
    get type() {
      return type ?? textFieldContext?.type;
    },
    get value() {
      return currentValue;
    },
  });
</script>

<div
  bind:this={groupElement}
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-invalid={withDataState(effectiveInvalid)}
  data-readonly={withDataState(effectiveReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-slot="input-group"
  onclick={handleClick}
  {...restProps}
>
  {@render children?.()}
</div>
