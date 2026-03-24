<script lang="ts">
  import type {Snippet} from "svelte";

  import {Dialog as BitsDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {getDrawerContext} from "./context";

  const DRAG_THRESHOLD = 8;
  const DISMISS_FRACTION = 0.3;
  const VELOCITY_THRESHOLD = 0.5;

  let {
    children,
    class: className = "",
    forceMount = false,
    onEscapeKeydown,
    onInteractOutside,
    preventScroll = true,
    trapFocus = true,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    onEscapeKeydown?: (event: KeyboardEvent) => void;
    onInteractOutside?: (event: PointerEvent) => void;
    preventScroll?: boolean;
    trapFocus?: boolean;
    [key: string]: unknown;
  } = $props();

  const context = getDrawerContext();
  const slotClass = $derived(context.slots.dialog?.({}) ?? "drawer__dialog");

  let dialogElement = $state<HTMLElement | null>(null);
  let dragging = false;
  let dragActive = false;
  let startPos = 0;
  let currentOffset = 0;
  let velocity = 0;
  let lastPos = 0;
  let lastTime = 0;

  const isVertical = $derived(
    context.placement === "bottom" || context.placement === "top",
  );

  const getPointerPosition = (event: PointerEvent) =>
    isVertical ? event.clientY : event.clientX;

  const clampOffset = (delta: number) => {
    switch (context.placement) {
      case "bottom":
      case "right":
        return Math.max(0, delta);
      case "left":
      case "top":
        return Math.min(0, delta);
      default:
        return delta;
    }
  };

  const handlePointerDown = (event: PointerEvent) => {
    if (!context.isDismissable || event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement | null;

    if (
      target?.closest(
        "input, textarea, button, [role='button'], select, a, [data-slot='drawer-body']",
      )
    ) {
      return;
    }

    dragging = true;
    dragActive = false;
    startPos = getPointerPosition(event);
    lastPos = startPos;
    lastTime = Date.now();
    currentOffset = 0;
    velocity = 0;
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!dragging || !dialogElement) {
      return;
    }

    const position = getPointerPosition(event);
    const rawDelta = position - startPos;
    const delta = clampOffset(rawDelta);

    if (!dragActive) {
      if (Math.abs(rawDelta) < DRAG_THRESHOLD) {
        return;
      }

      dragActive = true;
      dialogElement.style.transition = "none";
      dialogElement.setPointerCapture(event.pointerId);
    }

    currentOffset = delta;
    const now = Date.now();
    const elapsed = now - lastTime;

    if (elapsed > 0) {
      velocity = (position - lastPos) / elapsed;
      lastTime = now;
      lastPos = position;
    }

    const axis = isVertical ? "Y" : "X";

    dialogElement.style.transform = `translate${axis}(${delta}px)`;
  };

  const resetDragStyles = () => {
    if (!dialogElement) {
      return;
    }

    dialogElement.style.transition = "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)";
    dialogElement.style.transform = "";

    const element = dialogElement;
    const cleanup = () => {
      element.style.transition = "";
    };

    element.addEventListener("transitionend", cleanup, {once: true});
  };

  const handlePointerEnd = (event: PointerEvent) => {
    if (!dragging) {
      return;
    }

    dragging = false;

    if (!dialogElement || !dragActive) {
      dragActive = false;
      return;
    }

    dragActive = false;

    try {
      dialogElement.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released.
    }

    const dimension = isVertical
      ? dialogElement.offsetHeight
      : dialogElement.offsetWidth;
    const shouldDismiss =
      Math.abs(currentOffset) > dimension * DISMISS_FRACTION ||
      Math.abs(velocity) > VELOCITY_THRESHOLD;

    if (shouldDismiss) {
      context.close();
    } else {
      resetDragStyles();
    }

    currentOffset = 0;
    velocity = 0;
  };

  const handleEscape = (event: KeyboardEvent) => {
    onEscapeKeydown?.(event);
  };

  const handleInteractOutside = (event: PointerEvent) => {
    onInteractOutside?.(event);

    if (!context.isDismissable) {
      event.preventDefault();
    }
  };
</script>

{#snippet contentChild({props})}
  <div
    bind:this={dialogElement}
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-entering={context.open ? "true" : undefined}
    data-exiting={context.open ? undefined : "true"}
    data-placement={context.placement}
    data-slot="drawer-dialog"
    onpointercancel={handlePointerEnd}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerEnd}
    style:touch-action={context.isDismissable ? "none" : undefined}
  >
    {@render children?.()}
  </div>
{/snippet}

<BitsDialog.Content
  child={contentChild}
  {forceMount}
  interactOutsideBehavior={context.isDismissable ? "close" : "ignore"}
  onEscapeKeydown={handleEscape}
  onInteractOutside={handleInteractOutside}
  {preventScroll}
  {trapFocus}
/>
