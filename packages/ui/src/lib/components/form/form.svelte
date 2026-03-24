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

<form class={cn("form", className)} data-slot="form" {...restProps}>
  {@render children?.()}
</form>
