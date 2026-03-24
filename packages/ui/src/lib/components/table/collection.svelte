<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getTableContext} from "./context";

  let {
    children,
    class: className = "",
    isCurrent,
    isDisabled,
    isExpanded,
    isFocusVisible,
    isHovered,
    isInvalid,
    isOpen,
    isPending,
    isPressed,
    isReadOnly,
    isRequired,
    isSelected,
    open,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getTableContext);
  const slotClass = $derived(context?.slots?.collection?.({}) ?? "table__collection");
</script>

<div
  class={cn(slotClass, className)}
  data-current={withDataState(isCurrent)}
  data-disabled={withDataState(isDisabled)}
  data-expanded={withDataState(isExpanded)}
  data-focus-visible={withDataState(isFocusVisible)}
  data-hovered={withDataState(isHovered)}
  data-invalid={withDataState(isInvalid)}
  data-open={withDataState(isOpen || open)}
  data-pending={withDataState(isPending)}
  data-pressed={withDataState(isPressed)}
  data-readonly={withDataState(isReadOnly)}
  data-required={withDataState(isRequired)}
  data-selected={withDataState(isSelected)}
  data-slot="table-collection"
  {...restProps}
>
  {@render children?.()}
</div>
