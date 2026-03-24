<script lang="ts">
  import type {Snippet} from "svelte";

  import {listboxSectionVariants} from "@heroui-svelte/styles";

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

  const rootClass = listboxSectionVariants();
</script>

<div class={cn(rootClass, className)} data-slot="list-box-section" {...restProps}>
  {@render children?.()}
</div>
