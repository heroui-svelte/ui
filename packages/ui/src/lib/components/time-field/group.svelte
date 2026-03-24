<script lang="ts">
  import type {Snippet} from "svelte";

  import {dateInputGroupVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getTimeFieldContext, setTimeFieldGroupContext} from "./context";
  import TimeFieldInput from "./input.svelte";

  let {
    children,
    class: className = "",
    fullWidth,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    variant = "primary",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    fullWidth?: boolean;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    variant?: "primary" | "secondary";
    [key: string]: any;
  } = $props();

  const rootContext = safeGetContext(getTimeFieldContext);
  const resolvedFullWidth = $derived(fullWidth ?? rootContext?.fullWidth ?? false);
  const effectiveDisabled = $derived(Boolean(isDisabled ?? rootContext?.isDisabled));
  const effectiveInvalid = $derived(Boolean(isInvalid ?? rootContext?.isInvalid));
  const effectiveReadOnly = $derived(Boolean(isReadOnly ?? rootContext?.isReadOnly));
  const effectiveRequired = $derived(Boolean(isRequired ?? rootContext?.isRequired));
  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        dateInputGroupVariants({
          fullWidth: resolvedFullWidth,
          variant,
        }),
        "date-input-group",
      ),
  );
  const groupClass = $derived(slots.base?.({}) ?? "date-input-group");

  setTimeFieldGroupContext({
    get slots() {
      return slots;
    },
  });
</script>

<div
  aria-disabled={effectiveDisabled ? "true" : undefined}
  aria-invalid={effectiveInvalid ? "true" : undefined}
  class={cn(groupClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-invalid={withDataState(effectiveInvalid)}
  data-readonly={withDataState(effectiveReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-slot="date-input-group"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <TimeFieldInput />
  {/if}
</div>
