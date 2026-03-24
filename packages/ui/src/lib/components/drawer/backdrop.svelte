<script lang="ts">
  import type {Snippet} from "svelte";

  import {Dialog as BitsDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {drawerVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {getDrawerContext, setDrawerContext} from "./context";

  let {
    children,
    class: className = "",
    forceMount = false,
    isDismissable = true,
    variant = "opaque",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    isDismissable?: boolean;
    variant?: "blur" | "opaque" | "transparent";
    [key: string]: unknown;
  } = $props();

  const context = getDrawerContext();
  const localSlots = $derived.by(() =>
    normalizeVariantResult(drawerVariants({variant}), "drawer"),
  );
  const slots = $derived.by(() => ({
    ...context.slots,
    ...localSlots,
  }));
  const slotClass = $derived(slots.backdrop?.({}) ?? "drawer__backdrop");

  setDrawerContext({
    close: context.close,
    get isDismissable() {
      return isDismissable;
    },
    get open() {
      return context.open;
    },
    get placement() {
      return context.placement;
    },
    get slots() {
      return slots;
    },
  });
</script>

{#snippet overlayChild({props})}
  <div
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-entering={context.open ? "true" : undefined}
    data-exiting={context.open ? undefined : "true"}
    data-slot="drawer-backdrop"
  >
    {@render children?.()}
  </div>
{/snippet}

<BitsDialog.Portal>
  <BitsDialog.Overlay child={overlayChild} {forceMount} />
</BitsDialog.Portal>
