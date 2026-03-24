<script lang="ts">
  import type {Snippet} from "svelte";

  import {kbdVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setKbdContext} from "./context";

  let {
    children,
    class: className = "",
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    variant?: "default" | "light";
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () => normalizeVariantResult(kbdVariants({variant}), "kbd"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "kbd");

  setKbdContext({
    get slots() {
      return slots;
    },
  });
</script>

<kbd class={cn(rootClass, className)} data-slot="kbd" {...restProps}>
  {@render children?.()}
</kbd>
