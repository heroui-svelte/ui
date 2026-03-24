<script lang="ts">
  import type {Snippet} from "svelte";

  import {surfaceVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";

  let {
    children,
    class: className = "",
    variant = "default",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    variant?: "default" | "secondary" | "tertiary" | "transparent";
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () => normalizeVariantResult(surfaceVariants({variant}), "surface"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "surface");
</script>

<div class={cn(rootClass, className)} data-slot="surface" {...restProps}>
  {@render children?.()}
</div>
