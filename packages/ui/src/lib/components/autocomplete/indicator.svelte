<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAutocompleteContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getAutocompleteContext);
  const slotClass = $derived(context?.slots?.indicator?.({}) ?? "autocomplete__indicator");
</script>

<span
  class={cn(slotClass, className)}
  data-open={context?.open ? "true" : undefined}
  data-slot="autocomplete-indicator"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <svg
      aria-hidden="true"
      data-slot="autocomplete-default-indicator"
      fill="none"
      role="presentation"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.75"
      viewBox="0 0 16 16"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  {/if}
</span>
