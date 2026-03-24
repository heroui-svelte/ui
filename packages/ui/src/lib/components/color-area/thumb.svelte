<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getColorAreaContext} from "./context";

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

  const context = safeGetContext(getColorAreaContext);
  const slotClass = $derived(context?.slots?.thumb?.({}) ?? "color-area__thumb");
  const thumbStyle = $derived.by(() =>
    [context?.thumbStyle, style].filter(Boolean).join("; "),
  );
</script>

<span
  class={cn(slotClass, className)}
  data-disabled={withDataState(context?.isDisabled)}
  data-dragging={withDataState(context?.isDragging)}
  data-focus-visible={withDataState(context?.isFocusVisible)}
  data-slot="color-area-thumb"
  style={thumbStyle}
  {...restProps}
>
  {@render children?.()}
</span>
