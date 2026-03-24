<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getDisclosureContext} from "./context";

  let {
    children,
    class: className = "",
    onclick,
    type = "button",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    onclick?: (event: MouseEvent) => void;
    type?: "button" | "reset" | "submit";
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDisclosureContext);
  const slotClass = $derived(context?.slots?.trigger?.({}) ?? "disclosure__trigger");
  const currentExpanded = $derived(Boolean(context?.isExpanded));
  const currentDisabled = $derived(Boolean(context?.isDisabled));

  const handleClick = (event: MouseEvent) => {
    onclick?.(event);

    if (event.defaultPrevented || currentDisabled) {
      return;
    }

    context?.toggle?.();
  };
</script>

<button
  aria-controls={context?.contentId}
  aria-expanded={currentExpanded}
  class={cn(slotClass, className)}
  data-disabled={currentDisabled ? "true" : undefined}
  data-expanded={currentExpanded ? "true" : undefined}
  data-slot="disclosure-trigger"
  disabled={currentDisabled}
  id={context?.triggerId}
  onclick={handleClick}
  {type}
  {...restProps}
>
  {@render children?.()}
</button>
