<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getMenuItemContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getMenuItemContext);
  const slotClass = $derived(context?.slots?.submenuIndicator?.({}) ?? "menu-item__submenu-indicator");
</script>

{#if context?.hasSubmenu}
  <span
    aria-hidden="true"
    class={cn(slotClass, className)}
    data-slot="submenu-indicator"
    {...restProps}
  >
    {#if children}
      {@render children()}
    {:else}
      <svg
        aria-hidden="true"
        fill="none"
        role="presentation"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.75"
        viewBox="0 0 16 16"
      >
        <path d="m6 4 4 4-4 4" />
      </svg>
    {/if}
  </span>
{/if}
