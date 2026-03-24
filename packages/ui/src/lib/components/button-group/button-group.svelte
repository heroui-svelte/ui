<script lang="ts">
  import type {Snippet} from "svelte";

  import {buttonGroupVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setButtonGroupContext} from "./context";

  let {
    children,
    class: className = "",
    fullWidth = false,
    isDisabled = false,
    orientation = "horizontal",
    size,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    fullWidth?: boolean;
    isDisabled?: boolean;
    orientation?: "horizontal" | "vertical";
    size?: "sm" | "md" | "lg";
    variant?: "danger" | "danger-soft" | "ghost" | "outline" | "primary" | "secondary" | "tertiary";
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () => normalizeVariantResult(buttonGroupVariants({fullWidth, orientation}), "button-group"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "button-group");

  setButtonGroupContext({
    get fullWidth() {
      return fullWidth;
    },
    get isDisabled() {
      return isDisabled;
    },
    get size() {
      return size;
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
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-orientation={orientation}
  data-slot="button-group"
  role="group"
  {...restProps}
>
  {@render children?.()}
</div>
