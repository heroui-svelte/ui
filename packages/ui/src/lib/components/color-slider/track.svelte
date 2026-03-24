<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getColorSliderContext} from "./context";

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

  let trackElement = $state<HTMLDivElement | null>(null);
  const context = safeGetContext(getColorSliderContext);
  const slotClass = $derived(context?.slots?.track?.({}) ?? "color-slider__track");
  const resolvedStyle = $derived.by(() =>
    [context?.trackStyle, style].filter(Boolean).join("; "),
  );

  $effect(() => {
    context?.registerTrack?.(trackElement);

    return () => {
      context?.registerTrack?.(null);
    };
  });
</script>

<div
  bind:this={trackElement}
  aria-disabled={context?.isDisabled ? "true" : undefined}
  class={cn(slotClass, className)}
  data-disabled={withDataState(context?.isDisabled)}
  data-orientation={context?.orientation ?? "horizontal"}
  data-slot="color-slider-track"
  onblur={() => context?.setFocusVisible?.(false)}
  onfocus={() => context?.setFocusVisible?.(true)}
  onkeydown={(event) => context?.onTrackKeydown?.(event)}
  onpointerdown={(event) => context?.onTrackPointerStart?.(event)}
  role="slider"
  style={resolvedStyle}
  tabindex={context?.isDisabled ? undefined : 0}
  {...restProps}
>
  {@render children?.()}
</div>
