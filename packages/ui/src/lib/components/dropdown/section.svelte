<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {menuSectionVariants} from "@heroui-svelte/styles";
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

  const slotClass = $derived(
    normalizeVariantResult(menuSectionVariants(), "menu-section").base?.({}) ?? "menu-section",
  );
</script>

<div
  class={cn(slotClass, className)}
  data-slot="menu-section"
  {...restProps}
>
  {@render children?.()}
</div>
