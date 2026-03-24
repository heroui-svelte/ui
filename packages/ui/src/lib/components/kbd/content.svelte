<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getKbdContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getKbdContext);
  const slotClass = $derived(context?.slots?.content?.({}) ?? "kbd__content");
</script>

<span class={cn(slotClass, className)} data-slot="kbd-content" {...restProps}>
  {@render children?.()}
</span>
