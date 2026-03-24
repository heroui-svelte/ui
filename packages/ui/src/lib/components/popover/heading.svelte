<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getPopoverContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getPopoverContext);
  const slotClass = $derived(context?.slots.heading?.({}) ?? "popover__heading");
</script>

<h3 class={cn(slotClass, className)} data-slot="popover-heading" {...restProps}>
  {@render children?.()}
</h3>
