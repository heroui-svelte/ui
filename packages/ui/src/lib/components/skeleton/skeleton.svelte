<script lang="ts">
  import type {Snippet} from "svelte";

  import {skeletonVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";

  let {
    children,
    class: className = "",
    animationType,
    ...restProps
  }: {
    animationType?: "none" | "pulse" | "shimmer";
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () => normalizeVariantResult(skeletonVariants({animationType}), "skeleton"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "skeleton");
</script>

<div class={cn(rootClass, className)} data-slot="skeleton" {...restProps}>
  {@render children?.()}
</div>
