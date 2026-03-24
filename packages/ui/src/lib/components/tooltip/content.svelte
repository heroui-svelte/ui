<script lang="ts">
  import type {Snippet} from "svelte";

  import {Tooltip as BitsTooltip} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getTooltipContext} from "./context";

  type TooltipAlign = "center" | "end" | "start";
  type TooltipSide = "bottom" | "left" | "right" | "top";

  const resolvePlacement = (placement?: string) => {
    const normalized = placement?.trim().replace(/\s+/g, "-") || "top";
    const [rawSide, rawAlign] = normalized.split("-");
    const side: TooltipSide =
      rawSide === "left" || rawSide === "right" || rawSide === "bottom"
        ? rawSide
        : rawSide === "start"
          ? "left"
          : rawSide === "end"
            ? "right"
            : "top";
    const align: TooltipAlign =
      rawAlign === "start" || rawAlign === "end" ? rawAlign : "center";

    return {align, side};
  };

  let {
    children,
    class: className = "",
    forceMount = false,
    offset,
    placement = "top",
    showArrow = false,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    offset?: number;
    placement?: string;
    showArrow?: boolean;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getTooltipContext);
  const slotClass = $derived(context?.slots.base?.({}) ?? "tooltip");
  const parsedPlacement = $derived(resolvePlacement(placement));
  const resolvedOffset = $derived(offset ?? (showArrow ? 7 : 3));
</script>

{#snippet contentChild({props, wrapperProps})}
  <div {...wrapperProps}>
    <div
      {...props}
      {...restProps}
      class={cn(props.class, slotClass, className)}
      data-placement={String(props["data-side"] ?? parsedPlacement.side)}
      data-slot="tooltip"
    >
      {@render children?.()}
    </div>
  </div>
{/snippet}

<BitsTooltip.Content
  align={parsedPlacement.align}
  child={contentChild}
  forceMount={forceMount}
  side={parsedPlacement.side}
  sideOffset={resolvedOffset}
/>
