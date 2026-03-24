<script lang="ts">
  import type {Snippet} from "svelte";

  import {DropdownMenu as BitsDropdownMenu} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getDropdownContext} from "./context";
  import {getDropdownSubmenuContext} from "./submenu-context";

  type PopoverAlign = "center" | "end" | "start";
  type PopoverSide = "bottom" | "left" | "right" | "top";

  const resolvePlacement = (placement?: string) => {
    const normalized = placement?.trim().replace(/\s+/g, "-") || "bottom";
    const [rawSide, rawAlign] = normalized.split("-");
    const side: PopoverSide =
      rawSide === "left" || rawSide === "right" || rawSide === "top"
        ? rawSide
        : rawSide === "start"
          ? "left"
          : rawSide === "end"
            ? "right"
            : "bottom";
    const align: PopoverAlign =
      rawAlign === "start" || rawAlign === "end" ? rawAlign : "center";

    return {align, side};
  };

  let {
    children,
    class: className = "",
    forceMount = false,
    offset = 8,
    placement = "bottom",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    offset?: number;
    placement?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDropdownContext);
  const slotClass = $derived(context?.slots?.popover?.({}) ?? "dropdown__popover");
  const isSubmenu = safeGetContext(getDropdownSubmenuContext) ?? false;
  const parsedPlacement = $derived(resolvePlacement(placement));
</script>

{#snippet contentChild({props, wrapperProps})}
  <div {...wrapperProps}>
    <div
      {...props}
      {...restProps}
      class={cn(props.class, slotClass, className)}
      data-placement={String(props["data-side"] ?? parsedPlacement.side)}
      data-slot="dropdown-popover"
    >
      {@render children?.()}
    </div>
  </div>
{/snippet}

{#if isSubmenu}
  <BitsDropdownMenu.SubContent
    align={parsedPlacement.align}
    child={contentChild}
    {forceMount}
    side={parsedPlacement.side}
    sideOffset={offset}
  />
{:else}
  <BitsDropdownMenu.Content
    align={parsedPlacement.align}
    child={contentChild}
    {forceMount}
    side={parsedPlacement.side}
    sideOffset={offset}
  />
{/if}
