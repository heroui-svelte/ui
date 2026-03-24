<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getDisclosureContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDisclosureContext);
  const bodyClass = $derived(context?.slots?.body?.({}) ?? "disclosure__body");
  const innerClass = $derived(context?.slots?.bodyInner?.({}) ?? "disclosure__body-inner");
  const currentExpanded = $derived(Boolean(context?.isExpanded));
  const currentDisabled = $derived(Boolean(context?.isDisabled));
</script>

<div
  class={bodyClass}
  data-disabled={currentDisabled ? "true" : undefined}
  data-expanded={currentExpanded ? "true" : undefined}
  data-slot="disclosure-body"
  {...restProps}
>
  <div class={cn(innerClass, className)}>{@render children?.()}</div>
</div>
