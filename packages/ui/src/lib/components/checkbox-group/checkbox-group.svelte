<script lang="ts">
  import type {Snippet} from "svelte";

  import {Checkbox as BitsCheckbox} from "bits-ui";

  import {checkboxGroupVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setCheckboxGroupContext} from "./context";

  let {
    children,
    class: className = "",
    defaultValue,
    disabled,
    isDisabled,
    isInvalid = false,
    isRequired = false,
    name,
    onChange,
    onValueChange,
    required,
    value,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultValue?: Iterable<string | number>;
    disabled?: boolean;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isRequired?: boolean;
    name?: string;
    onChange?: (value: string[]) => void;
    onValueChange?: (value: string[]) => void;
    required?: boolean;
    value?: Iterable<string | number>;
    variant?: "primary" | "secondary";
    [key: string]: any;
  } = $props();

  const normalizeValues = (nextValue?: Iterable<string | number>) => [...(nextValue ?? [])].map(String);

  const getDefaultValue = () => normalizeValues(defaultValue);

  let uncontrolledValue = $state(getDefaultValue());

  const slots = $derived.by(
    () => normalizeVariantResult(checkboxGroupVariants({variant}), "checkbox-group"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "checkbox-group");
  const currentValue = $derived(value === undefined ? uncontrolledValue : normalizeValues(value));
  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled));
  const effectiveRequired = $derived(Boolean(required ?? isRequired));

  const handleValueChange = (nextValue: string[]) => {
    if (value === undefined) {
      uncontrolledValue = nextValue;
    }

    onValueChange?.(nextValue);
    onChange?.(nextValue);
  };

  setCheckboxGroupContext({
    get isDisabled() {
      return effectiveDisabled;
    },
    get isInvalid() {
      return isInvalid;
    },
    get isRequired() {
      return effectiveRequired;
    },
    get value() {
      return currentValue;
    },
    get variant() {
      return variant;
    },
  });
</script>

<BitsCheckbox.Group
  aria-invalid={isInvalid ? "true" : undefined}
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-invalid={withDataState(isInvalid)}
  data-required={withDataState(effectiveRequired)}
  data-slot="checkbox-group"
  disabled={effectiveDisabled}
  name={name}
  onValueChange={handleValueChange}
  required={effectiveRequired}
  value={currentValue}
  {...restProps}
>
  {@render children?.()}
</BitsCheckbox.Group>
