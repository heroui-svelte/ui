<script lang="ts">
  import type {Snippet} from "svelte";

  import {Checkbox as BitsCheckbox} from "bits-ui";

  import {checkboxVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getCheckboxGroupContext} from "../checkbox-group/context";
  import {setCheckboxContext} from "./context";

  let {
    children,
    class: className = "",
    checked,
    defaultChecked,
    defaultSelected = false,
    disabled,
    id,
    indeterminate,
    isDisabled,
    isIndeterminate = false,
    isInvalid = false,
    isReadOnly = false,
    isRequired = false,
    isSelected,
    name,
    onChange,
    onCheckedChange,
    onIndeterminateChange,
    onSelectionChange,
    required,
    value,
    variant,
    ...restProps
  }: {
    checked?: boolean;
    children?: Snippet;
    class?: string;
    defaultChecked?: boolean;
    defaultSelected?: boolean;
    disabled?: boolean;
    id?: string;
    indeterminate?: boolean;
    isDisabled?: boolean;
    isIndeterminate?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isSelected?: boolean;
    name?: string;
    onChange?: (checked: boolean) => void;
    onCheckedChange?: (checked: boolean) => void;
    onIndeterminateChange?: (indeterminate: boolean) => void;
    onSelectionChange?: (checked: boolean) => void;
    required?: boolean;
    value?: string | number;
    variant?: "primary" | "secondary";
    [key: string]: any;
  } = $props();

  const groupContext = safeGetContext(getCheckboxGroupContext);
  const normalizedValue = $derived(value === undefined ? undefined : String(value));

  const getDefaultChecked = () => Boolean(defaultChecked ?? defaultSelected);
  const getDefaultIndeterminate = () => Boolean(indeterminate ?? isIndeterminate);

  let uncontrolledChecked = $state(getDefaultChecked());
  let uncontrolledIndeterminate = $state(getDefaultIndeterminate());

  const effectiveVariant = $derived(variant ?? groupContext?.variant ?? "primary");
  const slots = $derived.by(() =>
    normalizeVariantResult(
      checkboxVariants({
        variant: effectiveVariant,
      }),
      "checkbox",
    ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "checkbox");
  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled ?? groupContext?.isDisabled));
  const effectiveInvalid = $derived(Boolean(isInvalid ?? groupContext?.isInvalid));
  const effectiveRequired = $derived(Boolean(required ?? isRequired ?? groupContext?.isRequired));
  const controlledChecked = $derived(checked ?? isSelected);
  const controlledIndeterminate = $derived(indeterminate ?? isIndeterminate);
  const currentChecked = $derived(
    groupContext && normalizedValue !== undefined
      ? groupContext.value.includes(normalizedValue)
      : (controlledChecked ?? uncontrolledChecked),
  );
  const currentIndeterminate = $derived(
    groupContext ? false : (controlledIndeterminate ?? uncontrolledIndeterminate),
  );

  const handleCheckedChange = (nextChecked: boolean) => {
    if (!groupContext && controlledChecked === undefined) {
      uncontrolledChecked = nextChecked;
    }

    if (!groupContext && controlledIndeterminate === undefined && uncontrolledIndeterminate) {
      uncontrolledIndeterminate = false;
    }

    onCheckedChange?.(nextChecked);
    onChange?.(nextChecked);
    onSelectionChange?.(nextChecked);
  };

  const handleIndeterminateChange = (nextIndeterminate: boolean) => {
    if (!groupContext && controlledIndeterminate === undefined) {
      uncontrolledIndeterminate = nextIndeterminate;
    }

    onIndeterminateChange?.(nextIndeterminate);
  };

  setCheckboxContext({
    get isDisabled() {
      return effectiveDisabled;
    },
    get isIndeterminate() {
      return currentIndeterminate;
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
    get isSelected() {
      return currentChecked;
    },
    get slots() {
      return slots;
    },
  });
</script>

<BitsCheckbox.Root
  aria-invalid={effectiveInvalid ? "true" : undefined}
  checked={groupContext ? undefined : currentChecked}
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-indeterminate={withDataState(currentIndeterminate)}
  data-invalid={withDataState(effectiveInvalid)}
  data-readonly={withDataState(isReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-selected={withDataState(currentChecked)}
  data-slot="checkbox"
  disabled={effectiveDisabled}
  id={id}
  indeterminate={currentIndeterminate}
  name={name}
  onCheckedChange={handleCheckedChange}
  onIndeterminateChange={handleIndeterminateChange}
  required={effectiveRequired}
  value={normalizedValue}
  {...restProps}
>
  {@render children?.()}
</BitsCheckbox.Root>
