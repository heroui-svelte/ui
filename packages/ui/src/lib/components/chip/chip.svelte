<script lang="ts">
  import type {Snippet} from "svelte";

  import {chipVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setChipContext} from "./context";

  let {
    children,
    class: className = "",
    color,
    size,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    color?: "accent" | "danger" | "default" | "success" | "warning";
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary" | "soft" | "tertiary";
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        chipVariants({
          color,
          size,
          variant,
        }),
        "chip",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "chip");

  setChipContext({
    get slots() {
      return slots;
    },
  });
</script>

<span class={cn(rootClass, className)} data-slot="chip" {...restProps}>
  {@render children?.()}
</span>
