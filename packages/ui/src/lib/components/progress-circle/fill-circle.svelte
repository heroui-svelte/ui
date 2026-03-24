<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getProgressCircleContext} from "./context";

  const STROKE_WIDTH = 4;
  const CENTER = 18;
  const RADIUS = CENTER - STROKE_WIDTH / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  let {
    class: className = "",
    ...restProps
  }: {
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getProgressCircleContext);
  const slotClass = $derived(context?.slots?.fillCircle?.({}) ?? "progress-circle__fill-circle");
  const strokeDashoffset = $derived(
    context?.isIndeterminate
      ? CIRCUMFERENCE * 0.75
      : CIRCUMFERENCE - ((context?.percentage ?? 0) / 100) * CIRCUMFERENCE,
  );
</script>

<circle
  class={cn(slotClass, className)}
  cx={CENTER}
  cy={CENTER}
  data-slot="progress-circle-fill-circle"
  r={RADIUS}
  stroke-dasharray={CIRCUMFERENCE}
  stroke-dashoffset={strokeDashoffset}
  stroke-linecap="round"
  stroke-width={STROKE_WIDTH}
  transform={`rotate(-90 ${CENTER} ${CENTER})`}
  {...restProps}
></circle>
