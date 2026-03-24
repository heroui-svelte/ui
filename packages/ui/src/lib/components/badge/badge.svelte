<script lang="ts">
  import type {Snippet} from "svelte";

  import {badgeVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setBadgeContext} from "./context";

  let {
    children,
    class: className = "",
    color,
    placement,
    size,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    color?: "accent" | "danger" | "default" | "success" | "warning";
    placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary" | "soft";
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        badgeVariants({
          color,
          placement,
          size,
          variant,
        }),
        "badge",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "badge");

  setBadgeContext({
    get slots() {
      return slots;
    },
  });
</script>

<span class={cn(rootClass, className)} data-slot="badge" {...restProps}>
  {@render children?.()}
</span>
