<script lang="ts">
  import type {Snippet} from "svelte";

  import {errorMessageVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const slots = $derived.by(() =>
    normalizeVariantResult(errorMessageVariants(), "error-message"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "error-message");
</script>

<p class={cn(rootClass, className)} data-slot="error-message" {...restProps}>
  {@render children?.()}
</p>
