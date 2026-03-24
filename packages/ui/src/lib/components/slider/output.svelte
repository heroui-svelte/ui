<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getSliderContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getSliderContext);
  const slotClass = $derived(context?.slots?.output?.({}) ?? "slider__output");
  const valueLabel = $derived((context?.valueLabels ?? context?.values ?? []).join(" – "));
</script>

<output
  class={cn(slotClass, className)}
  data-orientation={context?.orientation ?? "horizontal"}
  data-slot="slider-output"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    {valueLabel}
  {/if}
</output>
