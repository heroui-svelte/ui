<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getMeterContext} from "./context";

  let {
    class: className = "",
    style,
    ...restProps
  }: {
    class?: string;
    style?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getMeterContext);
  const slotClass = $derived(context?.slots?.fill?.({}) ?? "meter__fill");
</script>

<div
  class={cn(slotClass, className)}
  data-slot="meter-fill"
  style={`width: ${context?.percentage ?? 0}%;${style ? ` ${style}` : ""}`}
  {...restProps}
></div>
