<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {resolveColor} from "../../internal/color";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {
    getColorSwatchPickerContext,
    setColorSwatchPickerItemContext,
  } from "./context";

  let {
    children,
    class: className = "",
    color,
    isDisabled = false,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    color: string;
    isDisabled?: boolean;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getColorSwatchPickerContext);
  const itemColor = $derived(resolveColor(color));
  const effectiveDisabled = $derived(Boolean(isDisabled || context?.isDisabled));
  const isSelected = $derived(Boolean(context?.color && itemColor.equals(context.color)));
  const slotClass = $derived(context?.slots?.item?.({}) ?? "color-swatch-picker__item");
  const itemStyle = $derived(`--color-swatch-current: ${itemColor.toString("css")}`);

  const handleClick = () => {
    if (effectiveDisabled) {
      return;
    }

    context?.setColor?.(itemColor);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleClick();
  };

  setColorSwatchPickerItemContext({
    get color() {
      return itemColor;
    },
    get isDisabled() {
      return effectiveDisabled;
    },
    get isSelected() {
      return isSelected;
    },
  });
</script>

<button
  aria-checked={isSelected ? "true" : "false"}
  class={cn(slotClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-selected={withDataState(isSelected)}
  data-slot="color-swatch-picker-item"
  disabled={effectiveDisabled}
  onclick={handleClick}
  onkeydown={handleKeydown}
  role={restProps.role ?? "radio"}
  style={itemStyle}
  type="button"
  {...restProps}
>
  {@render children?.()}
</button>
