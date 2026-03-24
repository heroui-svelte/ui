<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getCardContext} from "./context";

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

  const context = safeGetContext(getCardContext);
  const slotClass = $derived(context?.slots?.header?.({}) ?? "card__header");
</script>

<header
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
  data-slot="card-header"
  {...restProps}
>
  {@render children?.()}
</header>
