<script lang="ts">
  import type {Snippet} from "svelte";

  import {textVariants} from "@heroui-svelte/styles";

  let {
    children,
    class: className = "",
    size,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    size?: "xs" | "sm" | "base" | "lg" | "xl";
    variant?: "default" | "muted" | "success" | "warning" | "danger";
    [key: string]: any;
  } = $props();

  const rootClass = $derived(
    textVariants({
      className,
      size,
      variant,
    }),
  );
</script>

<p class={rootClass} data-slot="text" {...restProps}>
  {@render children?.()}
</p>
