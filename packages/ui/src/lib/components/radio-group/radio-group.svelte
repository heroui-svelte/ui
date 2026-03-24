<script lang="ts">
  import type {Snippet} from "svelte";

  import {RadioGroup as BitsRadioGroup} from "bits-ui";

  import {radioGroupVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setRadioGroupContext} from "./context";

  let {
    children,
    class: className = "",
    defaultValue,
    disabled,
    isDisabled,
    isInvalid = false,
    isRequired = false,
    loop = true,
    name,
    onChange,
    onValueChange,
    orientation = "vertical",
    required,
    value,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isRequired?: boolean;
    loop?: boolean;
    name?: string;
    onChange?: (value: string) => void;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    required?: boolean;
    value?: string | number;
    variant?: "primary" | "secondary";
    [key: string]: any;
  } = $props();

  const getDefaultValue = () => (defaultValue === undefined ? "" : String(defaultValue));

  let uncontrolledValue = $state(getDefaultValue());

  const slots = $derived.by(
    () => normalizeVariantResult(radioGroupVariants({variant}), "radio-group"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "radio-group");
  const currentValue = $derived(value === undefined ? uncontrolledValue : String(value));
  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled));
  const effectiveRequired = $derived(Boolean(required ?? isRequired));

  const handleValueChange = (nextValue: string) => {
    if (value === undefined) {
      uncontrolledValue = nextValue;
    }

    onValueChange?.(nextValue);
    onChange?.(nextValue);
  };

  setRadioGroupContext({
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
  });
</script>

<BitsRadioGroup.Root
  aria-invalid={isInvalid ? "true" : undefined}
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-invalid={withDataState(isInvalid)}
  data-required={withDataState(effectiveRequired)}
  data-slot="radio-group"
  disabled={effectiveDisabled}
  loop={loop}
  name={name}
  onValueChange={handleValueChange}
  orientation={orientation}
  required={effectiveRequired}
  value={currentValue}
  {...restProps}
>
  {@render children?.()}
</BitsRadioGroup.Root>
