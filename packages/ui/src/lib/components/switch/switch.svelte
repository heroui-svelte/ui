<script lang="ts">
  import type {Snippet} from "svelte";

  import {Switch as BitsSwitch} from "bits-ui";

  import {switchVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setSwitchContext} from "./context";

  let {
    checked,
    children,
    class: className = "",
    defaultChecked,
    defaultSelected = false,
    disabled,
    isDisabled,
    isInvalid = false,
    isReadOnly = false,
    isRequired = false,
    isSelected,
    name,
    onChange,
    onCheckedChange,
    onSelectionChange,
    required,
    size,
    value,
    ...restProps
  }: {
    checked?: boolean;
    children?: Snippet;
    class?: string;
    defaultChecked?: boolean;
    defaultSelected?: boolean;
    disabled?: boolean;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isSelected?: boolean;
    name?: string;
    onChange?: (checked: boolean) => void;
    onCheckedChange?: (checked: boolean) => void;
    onSelectionChange?: (checked: boolean) => void;
    required?: boolean;
    size?: "sm" | "md" | "lg";
    value?: string | number;
    [key: string]: any;
  } = $props();

  const getDefaultChecked = () => Boolean(defaultChecked ?? defaultSelected);

  let uncontrolledChecked = $state(getDefaultChecked());

  const slots = $derived.by(() =>
    normalizeVariantResult(
      switchVariants({
        size,
      }),
      "switch",
    ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "switch");
  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled));
  const effectiveRequired = $derived(Boolean(required ?? isRequired));
  const currentChecked = $derived(checked ?? isSelected ?? uncontrolledChecked);
  const normalizedValue = $derived(value === undefined ? undefined : String(value));

  const handleCheckedChange = (nextChecked: boolean) => {
    if (checked === undefined && isSelected === undefined) {
      uncontrolledChecked = nextChecked;
    }

    onCheckedChange?.(nextChecked);
    onChange?.(nextChecked);
    onSelectionChange?.(nextChecked);
  };

  setSwitchContext({
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
    get isSelected() {
      return currentChecked;
    },
    get slots() {
      return slots;
    },
  });
</script>

<BitsSwitch.Root
  aria-invalid={isInvalid ? "true" : undefined}
  checked={currentChecked}
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-invalid={withDataState(isInvalid)}
  data-readonly={withDataState(isReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-selected={withDataState(currentChecked)}
  data-slot="switch"
  disabled={effectiveDisabled}
  name={name}
  onCheckedChange={handleCheckedChange}
  required={effectiveRequired}
  value={normalizedValue}
  {...restProps}
>
  {@render children?.()}
</BitsSwitch.Root>
