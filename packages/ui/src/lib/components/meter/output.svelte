<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getMeterContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getMeterContext);
  const slotClass = $derived(context?.slots?.output?.({}) ?? "meter__output");
</script>

<output class={cn(slotClass, className)} data-slot="meter-output" {...restProps}>
  {#if children}
    {@render children?.()}
  {:else}
    {context?.valueText ?? ""}
  {/if}
</output>
