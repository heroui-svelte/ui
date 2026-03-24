<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getColorLuminance} from "../../internal/color";
  import {getColorSwatchPickerItemContext, getColorSwatchPickerContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getColorSwatchPickerContext);
  const itemContext = safeGetContext(getColorSwatchPickerItemContext);
  const slotClass = $derived(context?.slots?.indicator?.({}) ?? "color-swatch-picker__indicator");
  const isLightColor = $derived(
    itemContext?.color ? getColorLuminance(itemContext.color) > 0.5 : false,
  );
</script>

<span
  aria-hidden="true"
  class={cn(slotClass, className)}
  data-light-color={isLightColor ? "true" : undefined}
  data-slot="color-swatch-picker-indicator"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <svg
      aria-hidden="true"
      data-slot="color-swatch-picker-checkmark"
      fill="none"
      role="presentation"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      viewBox="0 0 12 12"
    >
      <polyline points="2.5 6 5 8.5 9.5 3" />
    </svg>
  {/if}
</span>
