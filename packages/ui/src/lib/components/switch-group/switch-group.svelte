<script lang="ts">
  import type {Snippet} from "svelte";

  import {switchGroupVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";

  let {
    children,
    class: className = "",
    orientation = "vertical",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    orientation?: "horizontal" | "vertical";
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () => normalizeVariantResult(switchGroupVariants({orientation}), "switch-group"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "switch-group");
  const itemsClass = $derived(slots.items?.({}) ?? "switch-group__items");
</script>

<div
  class={cn(rootClass, className)}
  data-orientation={orientation}
  data-slot="switch-group"
  {...restProps}
>
  <div
    class={itemsClass}
    data-orientation={orientation}
    data-slot="switch-group-items"
  >
    {@render children?.()}
  </div>
</div>
