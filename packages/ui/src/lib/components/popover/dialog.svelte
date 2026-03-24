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
  const slotClass = $derived(context?.slots.dialog?.({}) ?? "popover__dialog");
</script>

<div class={cn(slotClass, className)} data-slot="popover-dialog" {...restProps}>
  {@render children?.()}
</div>
