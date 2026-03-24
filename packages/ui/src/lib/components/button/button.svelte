<script lang="ts">
  import type {Snippet} from "svelte";

  import {buttonVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getButtonGroupContext} from "../button-group/context";

  let {
    children,
    class: className = "",
    disabled,
    fullWidth,
    isDisabled,
    isIconOnly = false,
    size,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    isDisabled?: boolean;
    isIconOnly?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "danger" | "danger-soft" | "ghost" | "outline" | "primary" | "secondary" | "tertiary";
    [key: string]: any;
  } = $props();

  const buttonGroupContext = safeGetContext(getButtonGroupContext);
  const finalSize = $derived(size ?? buttonGroupContext?.size);
  const finalVariant = $derived(variant ?? buttonGroupContext?.variant);
  const finalIsDisabled = $derived(Boolean(disabled ?? isDisabled ?? buttonGroupContext?.isDisabled));
  const finalFullWidth = $derived(Boolean(fullWidth ?? buttonGroupContext?.fullWidth));
  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        buttonVariants({
          fullWidth: finalFullWidth,
          isIconOnly,
          size: finalSize,
          variant: finalVariant,
        }),
        "button",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "button");
</script>

<button
  class={cn(rootClass, className)}
  data-disabled={withDataState(finalIsDisabled)}
  data-slot="button"
  disabled={finalIsDisabled}
  {...restProps}
>
  {@render children?.()}
</button>
