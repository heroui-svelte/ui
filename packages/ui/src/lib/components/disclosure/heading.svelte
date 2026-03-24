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
  const slotClass = $derived(context?.slots?.heading?.({}) ?? "disclosure__heading");
  const currentExpanded = $derived(Boolean(context?.isExpanded));
  const currentDisabled = $derived(Boolean(context?.isDisabled));
</script>

<h3
  class={cn(slotClass, className)}
  data-disabled={currentDisabled ? "true" : undefined}
  data-expanded={currentExpanded ? "true" : undefined}
  data-slot="disclosure-heading"
  {...restProps}
>
  {@render children?.()}
</h3>
