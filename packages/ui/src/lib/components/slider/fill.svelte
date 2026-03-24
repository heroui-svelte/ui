<script lang="ts">
  import type {Snippet} from "svelte";

  import {Slider as BitsSlider} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getSliderContext} from "./context";

  let {
    children,
    class: className = "",
    style = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    style?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getSliderContext);
  const slotClass = $derived(context?.slots?.fill?.({}) ?? "slider__fill");

  const serializeStyle = (styleValue: unknown) => {
    if (!styleValue) {
      return "";
    }

    if (typeof styleValue === "string") {
      return styleValue.trim().endsWith(";") ? styleValue.trim() : `${styleValue.trim()};`;
    }

    if (typeof styleValue !== "object") {
      return "";
    }

    return Object.entries(styleValue as Record<string, string | number | undefined>)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => `${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}: ${value};`)
      .join(" ");
  };
</script>

{#snippet fillChild({props})}
  <span
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-orientation={context?.orientation ?? "horizontal"}
    data-slot="slider-fill"
    style={`${serializeStyle(props.style)}${style ? ` ${style}` : ""}`}
  >
    {@render children?.()}
  </span>
{/snippet}

<BitsSlider.Range child={fillChild} />
