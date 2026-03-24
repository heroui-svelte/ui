<script lang="ts">
  import type {Snippet} from "svelte";

  import {RadioGroup as BitsRadioGroup} from "bits-ui";

  import {radioVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getRadioGroupContext} from "../radio-group/context";
  import {setRadioContext} from "./context";

  let {
    children,
    class: className = "",
    disabled,
    isDisabled,
    isInvalid = false,
    isRequired = false,
    required,
    value,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isRequired?: boolean;
    required?: boolean;
    value: string | number;
    [key: string]: any;
  } = $props();

  const groupContext = safeGetContext(getRadioGroupContext);
  const normalizedValue = $derived(String(value));
  const slots = $derived.by(() => normalizeVariantResult(radioVariants(), "radio"));
  const rootClass = $derived(slots.base?.({}) ?? "radio");
  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled ?? groupContext?.isDisabled));
  const effectiveInvalid = $derived(Boolean(isInvalid ?? groupContext?.isInvalid));
  const effectiveRequired = $derived(Boolean(required ?? isRequired ?? groupContext?.isRequired));
  const isSelected = $derived(groupContext?.value === normalizedValue);

  setRadioContext({
    get isDisabled() {
      return effectiveDisabled;
    },
    get isInvalid() {
      return effectiveInvalid;
    },
    get isRequired() {
      return effectiveRequired;
    },
    get isSelected() {
      return isSelected;
    },
    get slots() {
      return slots;
    },
  });
</script>

{#if groupContext}
  <BitsRadioGroup.Item
    aria-invalid={effectiveInvalid ? "true" : undefined}
    class={cn(rootClass, className)}
    data-disabled={withDataState(effectiveDisabled)}
    data-invalid={withDataState(effectiveInvalid)}
    data-required={withDataState(effectiveRequired)}
    data-selected={withDataState(isSelected)}
    data-slot="radio"
    disabled={effectiveDisabled}
    value={normalizedValue}
    {...restProps}
  >
    {@render children?.()}
  </BitsRadioGroup.Item>
{:else}
  <div
    aria-invalid={effectiveInvalid ? "true" : undefined}
    class={cn(rootClass, className)}
    data-disabled={withDataState(effectiveDisabled)}
    data-invalid={withDataState(effectiveInvalid)}
    data-required={withDataState(effectiveRequired)}
    data-selected={withDataState(isSelected)}
    data-slot="radio"
    {...restProps}
  >
    {@render children?.()}
  </div>
{/if}
