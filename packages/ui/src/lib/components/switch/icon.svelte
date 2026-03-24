<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getSwitchContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getSwitchContext);
  const slotClass = $derived(context?.slots?.icon?.({}) ?? "switch__icon");
  const isDisabled = $derived(context?.isDisabled ?? false);
  const isInvalid = $derived(context?.isInvalid ?? false);
  const isReadOnly = $derived(context?.isReadOnly ?? false);
  const isRequired = $derived(context?.isRequired ?? false);
  const isSelected = $derived(context?.isSelected ?? false);
</script>

<span
  class={cn(slotClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-invalid={withDataState(isInvalid)}
  data-readonly={withDataState(isReadOnly)}
  data-required={withDataState(isRequired)}
  data-selected={withDataState(isSelected)}
  data-slot="switch-icon"
  {...restProps}
>
  {@render children?.()}
</span>
