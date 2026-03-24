<script lang="ts">
  import type {Snippet} from "svelte";

  import IconChevronRight from "../../icons/IconChevronRight.svelte";
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

<span aria-hidden="true" class={cn(className)} data-slot="pagination-next-icon" {...restProps}>
  {#if children}
    {@render children()}
  {:else}
    <IconChevronRight />
  {/if}
</span>
