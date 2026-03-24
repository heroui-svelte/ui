<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAccordionContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getAccordionContext);
  const bodyClass = $derived(context?.slots.body?.({}) ?? "accordion__body");
  const innerClass = $derived(context?.slots.bodyInner?.({}) ?? "accordion__body-inner");
</script>

<div class={bodyClass} data-slot="accordion-body" {...restProps}>
  <div class={cn(innerClass, className)}>{@render children?.()}</div>
</div>
