<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getColorSwatchPickerItemContext, getColorSwatchPickerContext} from "./context";

  let {
    class: className = "",
    style = "",
    ...restProps
  }: {
    class?: string;
    style?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getColorSwatchPickerContext);
  const itemContext = safeGetContext(getColorSwatchPickerItemContext);
  const slotClass = $derived(context?.slots?.swatch?.({}) ?? "color-swatch-picker__swatch");
  const swatchStyle = $derived.by(() =>
    [
      `background: linear-gradient(var(--color-swatch-current), var(--color-swatch-current)), repeating-conic-gradient(#efefef 0% 25%, #f7f7f7 0% 50%) 50% / 16px 16px`,
      itemContext?.color ? `--color-swatch-current: ${itemContext.color.toString("css")}` : "",
      style,
    ]
      .filter(Boolean)
      .join("; "),
  );
</script>

<span
  class={cn(slotClass, className)}
  data-slot="color-swatch-picker-swatch"
  style={swatchStyle}
  {...restProps}
></span>
