<script lang="ts">
  import type {Snippet} from "svelte";

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
</script>

<div class={cn("tag-group__context", className)} data-slot="tag-group-context" {...restProps}>
  {@render children?.()}
</div>
