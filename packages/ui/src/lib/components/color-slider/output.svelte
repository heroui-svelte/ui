<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getColorSliderContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getColorSliderContext);
  const slotClass = $derived(context?.slots?.output?.({}) ?? "color-slider__output");
</script>

<output class={cn(slotClass, className)} data-slot="color-slider-output" {...restProps}>
  {#if children}
    {@render children?.()}
  {:else}
    {context?.outputValue ?? ""}
  {/if}
</output>
