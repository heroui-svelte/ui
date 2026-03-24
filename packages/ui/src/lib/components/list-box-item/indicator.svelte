<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getListBoxItemContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const itemContext = safeGetContext(getListBoxItemContext);
  const slotClass = $derived(itemContext?.slots?.indicator?.({}) ?? "list-box-item__indicator");
</script>

<span
  class={cn(slotClass, className)}
  data-slot="list-box-item-indicator"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <svg
      aria-hidden="true"
      data-slot="list-box-item-indicator--checkmark"
      fill="none"
      role="presentation"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 17 18"
    >
      <polyline points="1 9 7 14 15 4" />
    </svg>
  {/if}
</span>
