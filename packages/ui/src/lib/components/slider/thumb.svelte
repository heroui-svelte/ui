<script lang="ts">
  import type {Snippet} from "svelte";

  import {Slider as BitsSlider} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getSliderContext} from "./context";

  let {
    children,
    class: className = "",
    index = 0,
    isDisabled = false,
    style = "",
    ...restProps
  }: {
    children?: Snippet<[{
      active: boolean;
    }]>;
    class?: string;
    index?: number;
    isDisabled?: boolean;
    style?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getSliderContext);
  const slotClass = $derived(context?.slots?.thumb?.({}) ?? "slider__thumb");
  const getThumbStyle = (bitsStyle: unknown) => {
    const orientation = context?.orientation ?? "horizontal";
    const crossAxisOffset = orientation === "vertical" ? "left: 0%;" : "top: 0%;";
    const resolvedBitsStyle = typeof bitsStyle === "string" ? bitsStyle : "";

    return `${resolvedBitsStyle ? `${resolvedBitsStyle.trim()}${resolvedBitsStyle.trim().endsWith(";") ? "" : ";"}` : ""} ${crossAxisOffset}${style ? ` ${style}` : ""}`.trim();
  };
</script>

{#snippet thumbChild({props, active})}
  <span
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-active={active ? "true" : undefined}
    data-disabled={isDisabled ? "true" : undefined}
    data-dragging={active ? "true" : undefined}
    data-slot="slider-thumb"
    style={getThumbStyle(props.style)}
  >
    {@render children?.({active})}
  </span>
{/snippet}

<BitsSlider.Thumb child={thumbChild} disabled={isDisabled} {index} />
