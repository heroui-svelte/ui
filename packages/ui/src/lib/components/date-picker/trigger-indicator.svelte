<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getDatePickerContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDatePickerContext);
  const slotClass = $derived(context?.slots?.triggerIndicator?.({}) ?? "date-picker__trigger-indicator");
</script>

<span
  aria-hidden="true"
  class={cn(slotClass, className)}
  data-slot="date-picker-trigger-indicator"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 20 20" width="16">
      <rect height="12" rx="2" stroke="currentColor" stroke-width="1.5" width="14" x="3" y="5" />
      <path d="M6 3v4M14 3v4M3 8h14" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
    </svg>
  {/if}
</span>
