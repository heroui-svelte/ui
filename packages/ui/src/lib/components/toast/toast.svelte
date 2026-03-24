<script module lang="ts">
  let toastIdCounter = 0;
</script>

<script lang="ts">
  import type {Snippet} from "svelte";
  import type {ToastVariants} from "@heroui-svelte/styles";
  import type {TransitionConfig} from "svelte/transition";

  import {toastVariants} from "@heroui-svelte/styles";
  import {cubicIn, cubicOut} from "svelte/easing";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getToastContext, setToastContext} from "./context";

  const toastTransition = (
    _node: Element,
    placement: ToastVariants["placement"],
  ): TransitionConfig => {
    const direction = placement?.startsWith("bottom") ? 1 : -1;

    return {
      css: (t) => {
        const translate = (1 - t) * 100 * direction;
        const scale = 0.94 + 0.06 * t;

        return `opacity:${t};transform:translate3d(0, ${translate}%, 0) scale(${scale});`;
      },
      duration: 350,
      easing: direction > 0 ? cubicOut : cubicIn,
    };
  };

  let {
    children,
    class: className = "",
    index = 0,
    isFrontmost = true,
    isHidden = false,
    isLoading = false,
    placement,
    style = "",
    toastKey,
    variant = "default",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    index?: number;
    isFrontmost?: boolean;
    isHidden?: boolean;
    isLoading?: boolean;
    placement?: ToastVariants["placement"];
    style?: string;
    toastKey?: string | number;
    variant?: ToastVariants["variant"];
    [key: string]: any;
  } = $props();

  const providerContext = safeGetContext(getToastContext);
  let rootElement = $state<HTMLDivElement | undefined>(undefined);
  const fallbackToastKey = `toast-${++toastIdCounter}`;
  const resolvedPlacement = $derived(
    placement ?? providerContext?.placement ?? "bottom",
  );
  const resolvedToastKey = $derived(String(toastKey ?? fallbackToastKey));
  const orderedToastIds = $derived(providerContext?.orderedToastIds ?? []);
  const stackIndex = $derived(orderedToastIds.indexOf(resolvedToastKey));
  const resolvedIndex = $derived(stackIndex === -1 ? index : stackIndex);
  const resolvedGap = $derived(providerContext?.gap ?? 0);
  const resolvedScaleFactor = $derived(providerContext?.scaleFactor ?? 0);
  const resolvedMaxVisibleToasts = $derived(
    providerContext?.maxVisibleToasts ?? Number.POSITIVE_INFINITY,
  );
  const resolvedIsFrontmost = $derived(
    stackIndex === -1 ? isFrontmost : resolvedIndex <= 0,
  );
  const resolvedIsHidden = $derived(
    stackIndex === -1 ? isHidden : resolvedIndex >= resolvedMaxVisibleToasts,
  );
  const isBottomPlacement = $derived(resolvedPlacement?.startsWith("bottom") ?? false);
  const frontToastKey = $derived(orderedToastIds[0]);
  const frontHeight = $derived(
    frontToastKey ? providerContext?.heightsByKey?.[frontToastKey] ?? 0 : 0,
  );
  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        toastVariants({
          placement: resolvedPlacement,
          variant,
        }),
        "toast",
      ),
  );
  const rootClass = $derived(slots.toast?.({}) ?? "toast");
  const stackStyle = $derived.by(() => {
    const offset = resolvedIndex * resolvedGap;
    const translateY = (isBottomPlacement ? -1 : 1) * offset;
    const scale = 1 - resolvedIndex * resolvedScaleFactor;
    const sanitizedKey = resolvedToastKey.replace(/[^a-zA-Z0-9]/g, "-");

    return [
      `translate: 0 ${translateY}px 0`,
      `scale: ${scale}`,
      `z-index: ${Math.max(orderedToastIds.length - resolvedIndex, 1)}`,
      `opacity: ${resolvedIsHidden ? 0 : 1}`,
      `pointer-events: ${resolvedIsHidden ? "none" : "auto"}`,
      `view-transition-name: toast-${sanitizedKey}`,
      frontHeight ? `--front-height: ${frontHeight}px` : "",
      style,
    ]
      .filter(Boolean)
      .join("; ");
  });

  $effect(() => {
    if (!rootElement || !providerContext?.registerToast) {
      return;
    }

    providerContext.registerToast(resolvedToastKey, rootElement);
    providerContext.updateToastHeight?.(resolvedToastKey, rootElement.offsetHeight);

    if (typeof ResizeObserver === "undefined") {
      return () => {
        providerContext.unregisterToast?.(resolvedToastKey);
      };
    }

    const observer = new ResizeObserver(() => {
      providerContext.updateToastHeight?.(resolvedToastKey, rootElement.offsetHeight);
    });

    observer.observe(rootElement);

    return () => {
      observer.disconnect();
      providerContext.unregisterToast?.(resolvedToastKey);
    };
  });

  setToastContext({
    get placement() {
      return resolvedPlacement;
    },
    get isLoading() {
      return isLoading;
    },
    get slots() {
      return slots;
    },
    get variant() {
      return variant;
    },
  });
</script>

<div
  bind:this={rootElement}
  in:toastTransition={resolvedPlacement}
  out:toastTransition={resolvedPlacement}
  aria-hidden={resolvedIsHidden ? "true" : undefined}
  class={cn(rootClass, className)}
  data-frontmost={withDataState(resolvedIsFrontmost)}
  data-hidden={withDataState(resolvedIsHidden)}
  data-index={String(resolvedIndex)}
  data-slot="toast"
  role="status"
  style={stackStyle}
  {...restProps}
>
  {@render children?.()}
</div>
