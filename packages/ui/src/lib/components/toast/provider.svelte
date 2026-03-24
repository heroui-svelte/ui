<script lang="ts">
  import type {Snippet} from "svelte";
  import type {ToastVariants} from "@heroui-svelte/styles";

  import {toastVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {
    DEFAULT_GAP,
    DEFAULT_MAX_VISIBLE_TOAST,
    DEFAULT_SCALE_FACTOR,
    DEFAULT_TOAST_WIDTH,
  } from "./constants";
  import {setToastContext} from "./context";

  let {
    children,
    class: className = "",
    gap = DEFAULT_GAP,
    maxVisibleToasts = DEFAULT_MAX_VISIBLE_TOAST,
    placement = "bottom",
    scaleFactor = DEFAULT_SCALE_FACTOR,
    style = "",
    width = DEFAULT_TOAST_WIDTH,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    gap?: number;
    maxVisibleToasts?: number;
    placement?: ToastVariants["placement"];
    scaleFactor?: number;
    style?: string;
    width?: number | string;
    [key: string]: any;
  } = $props();

  let regionElement = $state<HTMLDivElement | undefined>(undefined);
  let orderedToastIds = $state<string[]>([]);
  let heightsByKey = $state<Record<string, number>>({});

  const toastNodes = new Map<string, HTMLElement>();

  const haveSameOrder = (nextIds: string[], currentIds: string[]) =>
    nextIds.length === currentIds.length &&
    nextIds.every((id, index) => id === currentIds[index]);

  const syncOrderedToastIds = () => {
    const nextIds = [...toastNodes.entries()]
      .filter(([, node]) => regionElement?.contains(node) ?? false)
      .sort(([, leftNode], [, rightNode]) => {
        if (leftNode === rightNode) {
          return 0;
        }

        const position = leftNode.compareDocumentPosition(rightNode);

        if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1;
        }

        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
          return 1;
        }

        return 0;
      })
      .map(([id]) => id);

    if (!haveSameOrder(nextIds, orderedToastIds)) {
      orderedToastIds = nextIds;
    }
  };

  const registerToast = (key: string, node: HTMLElement) => {
    toastNodes.set(key, node);
    syncOrderedToastIds();
  };

  const unregisterToast = (key: string) => {
    toastNodes.delete(key);

    if (key in heightsByKey) {
      const nextHeights = {...heightsByKey};
      delete nextHeights[key];
      heightsByKey = nextHeights;
    }

    syncOrderedToastIds();
  };

  const updateToastHeight = (key: string, height: number) => {
    if (!height || heightsByKey[key] === height) {
      return;
    }

    heightsByKey = {
      ...heightsByKey,
      [key]: height,
    };
  };

  $effect(() => {
    if (!regionElement || typeof MutationObserver === "undefined") {
      return;
    }

    const observer = new MutationObserver(() => {
      syncOrderedToastIds();
    });

    observer.observe(regionElement, {
      childList: true,
    });

    return () => {
      observer.disconnect();
    };
  });

  const slots = $derived.by(
    () => normalizeVariantResult(toastVariants({placement}), "toast"),
  );
  const regionClass = $derived(slots.region?.({}) ?? "toast-region");
  const regionStyle = $derived.by(() =>
    [
      style,
      `--gap: ${gap}px`,
      `--scale-factor: ${scaleFactor}`,
      `--placement: ${placement}`,
      `--toast-width: ${typeof width === "number" ? `${width}px` : width}`,
    ]
      .filter(Boolean)
      .join("; "),
  );

  setToastContext({
    get gap() {
      return gap;
    },
    get heightsByKey() {
      return heightsByKey;
    },
    get maxVisibleToasts() {
      return maxVisibleToasts;
    },
    get orderedToastIds() {
      return orderedToastIds;
    },
    get placement() {
      return placement;
    },
    get registerToast() {
      return registerToast;
    },
    get scaleFactor() {
      return scaleFactor;
    },
    get slots() {
      return slots;
    },
    get unregisterToast() {
      return unregisterToast;
    },
    get updateToastHeight() {
      return updateToastHeight;
    },
  });
</script>

<div
  bind:this={regionElement}
  class={cn(regionClass, className)}
  data-slot="toast-region"
  style={regionStyle}
  {...restProps}
>
  {@render children?.()}
</div>
