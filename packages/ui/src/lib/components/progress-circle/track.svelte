<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getProgressCircleContext} from "./context";

  const VIEW_BOX_SIZE = 36;

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getProgressCircleContext);
  const slotClass = $derived(context?.slots?.track?.({}) ?? "progress-circle__track");
</script>

<svg
  class={cn(slotClass, className)}
  data-slot="progress-circle-track"
  fill="none"
  viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
  {...restProps}
>
  {@render children?.()}
</svg>
