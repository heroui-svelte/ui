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
  const slotClass = $derived(context?.slots?.marks?.({}) ?? "slider__marks");
  const tickCount = $derived.by(() => {
    const min = context?.min ?? 0;
    const max = context?.max ?? 100;
    const step = context?.step ?? 1;
    const range = Math.max(max - min, 0);

    return Math.floor(range / step) + 1;
  });
  const tickIndexes = $derived(Array.from({length: tickCount}, (_, index) => index));
</script>

<div
  class={cn(slotClass, className)}
  data-orientation={context?.orientation ?? "horizontal"}
  data-slot="slider-marks"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    {#each tickIndexes as index (index)}
      <span data-slot="slider-mark" data-value={index}></span>
    {/each}
  {/if}
</div>
