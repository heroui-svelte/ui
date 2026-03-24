<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getDisclosureContext} from "./context";

  let {
    children,
    class: className = "",
    forceMount = true,
    style = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    style?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDisclosureContext);
  const slotClass = $derived(context?.slots?.content?.({}) ?? "disclosure__content");
  const currentExpanded = $derived(Boolean(context?.isExpanded));
  const currentDisabled = $derived(Boolean(context?.isDisabled));

  let contentElement = $state<HTMLDivElement | null>(null);
  let contentHeight = $state(0);
  const panelStyle = $derived(
    `${style ? `${style}; ` : ""}--disclosure-panel-height: ${currentExpanded ? `${contentHeight}px` : "0px"};`,
  );

  $effect(() => {
    const element = contentElement;

    if (!element) {
      return;
    }

    const updateHeight = () => {
      contentHeight = element.scrollHeight;
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  });
</script>

{#if forceMount || currentExpanded}
  <div
    aria-hidden={currentExpanded ? undefined : "true"}
    aria-labelledby={context?.triggerId}
    class={cn(slotClass, className)}
    data-disabled={currentDisabled ? "true" : undefined}
    data-expanded={currentExpanded ? "true" : undefined}
    data-slot="disclosure-content"
    id={context?.contentId}
    inert={currentExpanded ? undefined : true}
    role="region"
    style={panelStyle}
    {...restProps}
  >
    <div bind:this={contentElement}>
      {@render children?.()}
    </div>
  </div>
{/if}
