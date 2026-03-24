<script lang="ts">
  import type {Snippet} from "svelte";

  import type {ScrollShadowVariants} from "@heroui-svelte/styles";

  import {scrollShadowVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import type {ScrollShadowVisibility} from "./types";

  let {
    children,
    class: className = "",
    hideScrollBar = false,
    isEnabled = true,
    offset = 0,
    onVisibilityChange,
    orientation = "vertical",
    size = 40,
    variant = "fade",
    visibility = "auto",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    hideScrollBar?: ScrollShadowVariants["hideScrollBar"];
    isEnabled?: boolean;
    offset?: number;
    onVisibilityChange?: (visibility: ScrollShadowVisibility) => void;
    orientation?: ScrollShadowVariants["orientation"];
    size?: number;
    variant?: ScrollShadowVariants["variant"];
    visibility?: ScrollShadowVisibility;
    [key: string]: any;
  } = $props();

  let rootElement: HTMLDivElement | null = null;

  const slots = $derived.by(
    () => normalizeVariantResult(scrollShadowVariants({hideScrollBar, orientation, variant}), "scroll-shadow"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "scroll-shadow");

  const clearVisibilityData = (element: HTMLDivElement) => {
    delete element.dataset.topScroll;
    delete element.dataset.bottomScroll;
    delete element.dataset.topBottomScroll;
    delete element.dataset.leftScroll;
    delete element.dataset.rightScroll;
    delete element.dataset.leftRightScroll;
  };

  const applyVisibility = (element: HTMLDivElement, nextVisibility: ScrollShadowVisibility) => {
    clearVisibilityData(element);

    if (nextVisibility === "auto" || nextVisibility === "none") {
      return;
    }

    if (nextVisibility === "both") {
      element.dataset[orientation === "horizontal" ? "leftRightScroll" : "topBottomScroll"] =
        "true";

      return;
    }

    switch (nextVisibility) {
      case "top":
        element.dataset.topScroll = "true";
        break;
      case "bottom":
        element.dataset.bottomScroll = "true";
        break;
      case "left":
        element.dataset.leftScroll = "true";
        break;
      case "right":
        element.dataset.rightScroll = "true";
        break;
    }
  };

  const resolveVisibility = (
    hasScrollBefore: boolean,
    hasScrollAfter: boolean,
  ): ScrollShadowVisibility => {
    if (hasScrollBefore && hasScrollAfter) {
      return "both";
    }

    if (orientation === "horizontal") {
      if (hasScrollBefore) {
        return "left";
      }

      if (hasScrollAfter) {
        return "right";
      }

      return "none";
    }

    if (hasScrollBefore) {
      return "top";
    }

    if (hasScrollAfter) {
      return "bottom";
    }

    return "none";
  };

  const checkOverflow = () => {
    if (!rootElement) {
      return;
    }

    const isHorizontal = orientation === "horizontal";
    const scrollStart = isHorizontal ? rootElement.scrollLeft : rootElement.scrollTop;
    const scrollSize = isHorizontal ? rootElement.scrollWidth : rootElement.scrollHeight;
    const clientSize = isHorizontal ? rootElement.clientWidth : rootElement.clientHeight;
    const hasScrollBefore = scrollStart > offset;
    const hasScrollAfter = scrollStart + clientSize + offset < scrollSize;
    const nextVisibility = resolveVisibility(hasScrollBefore, hasScrollAfter);

    applyVisibility(rootElement, nextVisibility);
    onVisibilityChange?.(nextVisibility);
  };

  $effect(() => {
    if (!rootElement) {
      return;
    }

    const element = rootElement;

    if (!isEnabled) {
      clearVisibilityData(element);
      onVisibilityChange?.("none");

      return;
    }

    if (visibility !== "auto") {
      applyVisibility(element, visibility);
      onVisibilityChange?.(visibility);

      return;
    }

    let rafId: number | null = null;

    const scheduleCheck = () => {
      if (typeof requestAnimationFrame !== "function") {
        checkOverflow();

        return;
      }

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        rafId = null;
        checkOverflow();
      });
    };

    scheduleCheck();
    element.addEventListener("scroll", scheduleCheck, {passive: true});

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(scheduleCheck);

    resizeObserver?.observe(element);

    return () => {
      element.removeEventListener("scroll", scheduleCheck);
      resizeObserver?.disconnect();

      if (rafId !== null && typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(rafId);
      }
    };
  });
</script>

<div
  bind:this={rootElement}
  class={cn(rootClass, className)}
  data-orientation={orientation}
  data-scroll-shadow-size={size}
  data-slot="scroll-shadow"
  style:--scroll-shadow-size={`${size}px`}
  {...restProps}
>
  {@render children?.()}
</div>
