<script lang="ts">
  import type {Snippet} from "svelte";

  import {Popover as BitsPopover} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getColorPickerContext} from "./context";

  type PopoverAlign = "center" | "end" | "start";
  type PopoverSide = "bottom" | "left" | "right" | "top";

  const resolvePlacement = (placement?: string) => {
    const normalized = placement?.trim().replace(/\s+/g, "-") || "bottom-left";
    const [rawSide, rawAlign] = normalized.split("-");
    const side: PopoverSide =
      rawSide === "left" || rawSide === "right" || rawSide === "top"
        ? rawSide
        : "bottom";
    const align: PopoverAlign =
      rawAlign === "start" || rawAlign === "end"
        ? rawAlign
        : rawAlign === "left"
          ? "start"
          : rawAlign === "right"
            ? "end"
            : "center";

    return {align, side};
  };

  let {
    children,
    class: className = "",
    forceMount = false,
    offset = 8,
    placement = "bottom left",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    offset?: number;
    placement?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getColorPickerContext);
  const slotClass = $derived(context?.slots?.popover?.({}) ?? "color-picker__popover");
  const parsedPlacement = $derived(resolvePlacement(placement));
</script>

{#snippet popoverChild({props, wrapperProps})}
  <div {...wrapperProps}>
    <div
      {...props}
      {...restProps}
      class={cn(props.class, slotClass, className)}
      data-placement={`${String(props["data-side"] ?? parsedPlacement.side)}${props["data-align"] ? ` ${String(props["data-align"])}` : ""}`}
      data-slot="color-picker-popover"
    >
      {@render children?.()}
    </div>
  </div>
{/snippet}

<BitsPopover.Content
  align={parsedPlacement.align}
  child={popoverChild}
  forceMount={forceMount}
  side={parsedPlacement.side}
  sideOffset={offset}
/>
