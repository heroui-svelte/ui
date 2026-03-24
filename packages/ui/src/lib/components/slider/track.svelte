<script lang="ts">
  import type {Snippet} from "svelte";

  import {Slider as BitsSlider} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getSliderContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet<[{
      ticks: number[];
      thumbs: number[];
      values: number[];
    }]>;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getSliderContext);
  const slotClass = $derived(context?.slots?.track?.({}) ?? "slider__track");
  const rootValue = $derived.by(() => {
    const values = context?.values ?? [];

    if ((context?.resolvedType ?? "single") === "multiple") {
      return values;
    }

    return values[0] ?? 0;
  });
  const fillEdges = $derived.by(() => {
    const values = [...(context?.values ?? [])];
    const min = context?.min ?? 0;

    if (!values.length) {
      return {
        endsAtEdge: false,
        startsAtEdge: false,
      };
    }

    const max = context?.max ?? 100;
    const sorted = values.toSorted((left, right) => left - right);

    if (sorted.length === 1) {
      return {
        endsAtEdge: sorted[0] >= max,
        startsAtEdge: sorted[0] > min,
      };
    }

    return {
      endsAtEdge: sorted[sorted.length - 1] >= max,
      startsAtEdge: sorted[0] <= min,
    };
  });
</script>

{#snippet trackChild({props, ticks, thumbs})}
  <div
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-fill-end={fillEdges.endsAtEdge ? "true" : undefined}
    data-fill-start={fillEdges.startsAtEdge ? "true" : undefined}
    data-slot="slider-track"
  >
    {@render children?.({ticks, thumbs, values: context?.values ?? []})}
  </div>
{/snippet}

<BitsSlider.Root
  child={trackChild}
  disabled={context?.isDisabled ?? false}
  max={context?.max ?? 100}
  min={context?.min ?? 0}
  onValueChange={context?.handleValueChange as never}
  onValueCommit={context?.handleValueCommit as never}
  orientation={context?.orientation ?? "horizontal"}
  step={context?.step ?? 1}
  thumbPositioning="exact"
  type={context?.resolvedType ?? "single"}
  value={rootValue as never}
/>
