<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getProgressBarContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getProgressBarContext);
  const slotClass = $derived(context?.slots?.output?.({}) ?? "progress-bar__output");
</script>

<output class={cn(slotClass, className)} data-slot="progress-bar-output" {...restProps}>
  {#if children}
    {@render children?.()}
  {:else if !context?.isIndeterminate}
    {context?.valueText ?? ""}
  {/if}
</output>
