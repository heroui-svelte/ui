<script lang="ts">
  import type {Snippet} from "svelte";

  import {cardVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setCardContext} from "./context";

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
    () => normalizeVariantResult(cardVariants({variant}), "card"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "card");

  setCardContext({
    get slots() {
      return slots;
    },
  });
</script>

<div class={cn(rootClass, className)} data-slot="card" {...restProps}>
  {@render children?.()}
</div>
