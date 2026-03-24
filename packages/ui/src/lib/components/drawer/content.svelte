<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {drawerVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {getDrawerContext, setDrawerContext, type DrawerPlacement} from "./context";

  let {
    children,
    class: className = "",
    placement = "bottom",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    placement?: DrawerPlacement;
    [key: string]: unknown;
  } = $props();

  const context = getDrawerContext();
  const localSlots = $derived.by(() =>
    normalizeVariantResult(drawerVariants({placement}), "drawer"),
  );
  const slots = $derived.by(() => ({
    ...context.slots,
    ...localSlots,
  }));
  const slotClass = $derived(slots.content?.({}) ?? "drawer__content");

  setDrawerContext({
    close: context.close,
    get isDismissable() {
      return context.isDismissable;
    },
    get open() {
      return context.open;
    },
    get placement() {
      return placement;
    },
    get slots() {
      return slots;
    },
  });
</script>

<div
  class={cn(slotClass, className)}
  data-entering={context.open ? "true" : undefined}
  data-exiting={context.open ? undefined : "true"}
  data-placement={placement}
  data-slot="drawer-content"
  {...restProps}
>
  {@render children?.()}
</div>
