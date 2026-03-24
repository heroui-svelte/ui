<script lang="ts">
  import type {Snippet} from "svelte";

  import CloseButton from "../close-button/close-button.svelte";
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getSearchFieldContext} from "./context";

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

  const context = safeGetContext(getSearchFieldContext);
  const slotClass = $derived(context?.slots?.clearButton?.({}) ?? "search-field__clear-button");
  const currentDisabled = $derived(Boolean(context?.isDisabled));
  const currentReadOnly = $derived(Boolean(context?.isReadOnly));

  const handleClick = (event: MouseEvent) => {
    onclick?.(event);

    if (event.defaultPrevented || currentDisabled || currentReadOnly) {
      return;
    }

    context?.clear?.();
  };
</script>

  <CloseButton
    class={cn(slotClass, className)}
    data-slot="search-field-clear-button"
    disabled={currentDisabled || currentReadOnly}
    onclick={handleClick}
    slot="clear"
    {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</CloseButton>
