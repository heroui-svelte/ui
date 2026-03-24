<script lang="ts">
  import type {Snippet} from "svelte";

  import {headerVariants} from "@heroui-svelte/styles";

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

  const slots = $derived.by(() => normalizeVariantResult(headerVariants(), "header"));
  const rootClass = $derived(slots.base?.({}) ?? "header");
</script>

<header class={cn(rootClass, className)} data-slot="header" {...restProps}>
  {@render children?.()}
</header>
