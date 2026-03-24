<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getChipContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getChipContext);
  const slotClass = $derived(context?.slots?.label?.({}) ?? "chip__label");
</script>

<span class={cn(slotClass, className)} data-slot="chip-label" {...restProps}>
  {@render children?.()}
</span>
