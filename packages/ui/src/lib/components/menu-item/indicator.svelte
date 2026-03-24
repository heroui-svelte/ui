<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getMenuItemContext} from "./context";

  let {
    children,
    class: className = "",
    type = "checkmark",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    type?: "checkmark" | "dot";
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getMenuItemContext);
  const slotClass = $derived(context?.slots?.indicator?.({}) ?? "menu-item__indicator");
</script>

<span
  aria-hidden="true"
  class={cn(slotClass, className)}
  data-type={type}
  data-slot="menu-item-indicator"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else if type === "dot"}
    <svg
      aria-hidden="true"
      data-slot="menu-item-indicator--dot"
      fill="currentColor"
      fill-rule="evenodd"
      role="presentation"
      viewBox="0 0 16 16"
    >
      <path clip-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" />
    </svg>
  {:else}
    <svg
      aria-hidden="true"
      data-slot="menu-item-indicator--checkmark"
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
