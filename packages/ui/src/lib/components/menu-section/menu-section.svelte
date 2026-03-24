<script lang="ts">
  import type {Snippet} from "svelte";

  import {menuSectionVariants} from "@heroui-svelte/styles";

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

  const rootClass = menuSectionVariants();
</script>

<div class={cn(rootClass, className)} data-slot="menu-section" {...restProps}>
  {@render children?.()}
</div>
