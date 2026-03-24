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
  const slotClass = $derived(context?.slots?.clearButton?.({}) ?? "autocomplete__clear-button");
  const isEmpty = $derived(!context?.valueText);

  const handlePointerDown = (event: PointerEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    context?.clearSelection?.();
  };
</script>

<button
  class={cn(slotClass, className)}
  data-empty={isEmpty ? "true" : undefined}
  data-slot="autocomplete-clear-button"
  onpointerdown={handlePointerDown}
  onclick={handleClick}
  type="button"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <svg
      aria-hidden="true"
      data-slot="autocomplete-clear-button-icon"
      fill="none"
      role="presentation"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="1.75"
      viewBox="0 0 16 16"
    >
      <path d="M5 5l6 6M11 5 5 11" />
    </svg>
  {/if}
</button>
