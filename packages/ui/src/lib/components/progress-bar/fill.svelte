<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getProgressBarContext} from "./context";

  let {
    class: className = "",
    style,
    ...restProps
  }: {
    class?: string;
    style?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getProgressBarContext);
  const slotClass = $derived(context?.slots?.fill?.({}) ?? "progress-bar__fill");
  const widthStyle = $derived(
    context?.isIndeterminate ? "" : `width: ${context?.percentage ?? 0}%;`,
  );
</script>

<div
  class={cn(slotClass, className)}
  data-slot="progress-bar-fill"
  style={`${widthStyle}${style ? ` ${style}` : ""}`}
  {...restProps}
></div>
