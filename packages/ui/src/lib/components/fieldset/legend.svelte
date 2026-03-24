<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getFieldsetContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getFieldsetContext);
  const slotClass = $derived(context?.slots?.legend?.({}) ?? "fieldset__legend");
</script>

<legend class={cn(slotClass, className)} data-slot="fieldset-legend" {...restProps}>
  {@render children?.()}
</legend>
