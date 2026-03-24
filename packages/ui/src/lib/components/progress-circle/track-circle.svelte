<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getProgressCircleContext} from "./context";

  const STROKE_WIDTH = 4;
  const CENTER = 18;
  const RADIUS = CENTER - STROKE_WIDTH / 2;

  let {
    class: className = "",
    ...restProps
  }: {
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getProgressCircleContext);
  const slotClass = $derived(context?.slots?.trackCircle?.({}) ?? "progress-circle__track-circle");
</script>

<circle
  class={cn(slotClass, className)}
  cx={CENTER}
  cy={CENTER}
  data-slot="progress-circle-track-circle"
  r={RADIUS}
  stroke-width={STROKE_WIDTH}
  {...restProps}
></circle>
