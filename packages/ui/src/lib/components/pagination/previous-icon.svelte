<script lang="ts">
  import type {Snippet} from "svelte";

  import IconChevronLeft from "../../icons/IconChevronLeft.svelte";
  import {cn} from "../../internal/cn";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<span aria-hidden="true" class={cn(className)} data-slot="pagination-previous-icon" {...restProps}>
  {#if children}
    {@render children()}
  {:else}
    <IconChevronLeft />
  {/if}
</span>
