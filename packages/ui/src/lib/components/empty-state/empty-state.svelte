<script lang="ts">
  import type {Snippet} from "svelte";

  import {emptyStateVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () => normalizeVariantResult(emptyStateVariants(), "empty-state"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "empty-state");
</script>

<div class={cn(rootClass, className)} data-slot="empty-state" {...restProps}>
  {#if children}
    {@render children?.()}
  {:else}
    No results found
  {/if}
</div>
