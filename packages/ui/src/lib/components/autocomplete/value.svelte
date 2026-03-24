<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAutocompleteContext} from "./context";

  let {
    children,
    class: className = "",
    placeholder,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    placeholder?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getAutocompleteContext);
  const slotClass = $derived(context?.slots?.value?.({}) ?? "autocomplete__value");
  const displayText = $derived(context?.valueText || placeholder || context?.placeholder || "");
  const isPlaceholder = $derived(!context?.valueText);
</script>

<span
  class={cn(slotClass, className)}
  data-placeholder={isPlaceholder ? "true" : undefined}
  data-slot="autocomplete-value"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    {displayText}
  {/if}
</span>
