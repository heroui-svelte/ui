<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getCheckboxContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getCheckboxContext);
  const slotClass = $derived(context?.slots?.control?.({}) ?? "checkbox__control");
  const isDisabled = $derived(context?.isDisabled ?? false);
  const isIndeterminate = $derived(context?.isIndeterminate ?? false);
  const isInvalid = $derived(context?.isInvalid ?? false);
  const isReadOnly = $derived(context?.isReadOnly ?? false);
  const isRequired = $derived(context?.isRequired ?? false);
  const isSelected = $derived(context?.isSelected ?? false);
</script>

<div
  class={cn(slotClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-indeterminate={withDataState(isIndeterminate)}
  data-invalid={withDataState(isInvalid)}
  data-readonly={withDataState(isReadOnly)}
  data-required={withDataState(isRequired)}
  data-selected={withDataState(isSelected)}
  data-slot="checkbox-control"
  {...restProps}
>
  {@render children?.()}
</div>
