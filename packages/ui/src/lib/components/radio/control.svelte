<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getRadioContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getRadioContext);
  const slotClass = $derived(context?.slots?.control?.({}) ?? "radio__control");
  const isDisabled = $derived(context?.isDisabled ?? false);
  const isInvalid = $derived(context?.isInvalid ?? false);
  const isRequired = $derived(context?.isRequired ?? false);
  const isSelected = $derived(context?.isSelected ?? false);
</script>

<div
  class={cn(slotClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-invalid={withDataState(isInvalid)}
  data-required={withDataState(isRequired)}
  data-selected={withDataState(isSelected)}
  data-slot="radio-control"
  {...restProps}
>
  {@render children?.()}
</div>
