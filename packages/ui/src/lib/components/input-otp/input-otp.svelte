<script lang="ts">
  import type {Snippet} from "svelte";

  import {PinInput as BitsPinInput} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {inputOTPVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setInputOTPContext} from "./context";

  if (typeof window !== "undefined" && typeof window.CSS?.supports !== "function") {
    Object.defineProperty(window, "CSS", {
      configurable: true,
      value: {
        ...window.CSS,
        supports: () => false,
      },
    });
  }

  if (typeof window !== "undefined" && typeof window.ResizeObserver === "undefined") {
    class NoopResizeObserver {
      disconnect() {}
      observe() {}
      unobserve() {}
    }

    Object.defineProperty(window, "ResizeObserver", {
      configurable: true,
      value: NoopResizeObserver,
    });
  }

  let {
    children: content,
    class: className = "",
    defaultValue,
    isDisabled = false,
    isInvalid = false,
    maxLength,
    maxlength,
    onChange,
    onValueChange,
    value,
    variant = "primary",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultValue?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    maxLength?: number;
    maxlength?: number;
    onChange?: (value: string) => void;
    onValueChange?: (value: string) => void;
    value?: string;
    variant?: "primary" | "secondary";
    [key: string]: any;
  } = $props();

  let hasUncontrolledValue = $state(false);
  let uncontrolledValue = $state("");

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        inputOTPVariants({
          variant,
        }),
        "input-otp",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "input-otp");
  const currentValue = $derived(
    value ?? (hasUncontrolledValue ? uncontrolledValue : (defaultValue ?? "")),
  );

  const handleValueChange = (nextValue: string) => {
    if (value === undefined) {
      hasUncontrolledValue = true;
      uncontrolledValue = nextValue;
    }

    onValueChange?.(nextValue);
    onChange?.(nextValue);
  };

  setInputOTPContext({
    get isDisabled() {
      return isDisabled;
    },
    get isInvalid() {
      return isInvalid;
    },
    get maxLength() {
      return maxLength ?? maxlength ?? 6;
    },
    get slots() {
      return slots;
    },
    get value() {
      return currentValue;
    },
  });
</script>

<div
  class={cn(rootClass, className)}
  data-disabled={isDisabled ? "true" : undefined}
  data-invalid={isInvalid ? "true" : undefined}
  data-slot="input-otp"
>
  <BitsPinInput.Root
    disabled={isDisabled}
    maxlength={maxLength ?? maxlength ?? 6}
    onValueChange={handleValueChange}
    value={currentValue}
    {...restProps}
  >
    {#snippet children(_)}
      {@render content?.()}
    {/snippet}
  </BitsPinInput.Root>
</div>
