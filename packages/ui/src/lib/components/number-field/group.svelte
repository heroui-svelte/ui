<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getNumberFieldContext} from "./context";

  let {
    children,
    class: className = "",
    onclick,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    onclick?: (event: MouseEvent) => void;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getNumberFieldContext);
  const slotClass = $derived(context?.slots?.group?.({}) ?? "number-field__group");
  const currentDisabled = $derived(Boolean(context?.isDisabled));
  const currentInvalid = $derived(Boolean(context?.isInvalid));

  const handleClick = (event: MouseEvent) => {
    onclick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const target = event.target instanceof HTMLElement ? event.target : null;

    if (
      target?.closest(
        '[data-slot="number-field-input"], [data-slot="number-field-decrement-button"], [data-slot="number-field-increment-button"]',
      )
    ) {
      return;
    }

    context?.focusInput?.();
  };
</script>

<div
  class={cn(slotClass, className)}
  data-disabled={withDataState(currentDisabled)}
  data-invalid={withDataState(currentInvalid)}
  data-slot="number-field-group"
  onclick={handleClick}
  {...restProps}
>
  {@render children?.()}
</div>
