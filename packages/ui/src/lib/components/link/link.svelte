<script lang="ts">
  import type {Snippet} from "svelte";

  import {linkVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setLinkContext} from "./context";

  let {
    children,
    class: className = "",
    disabled,
    isDisabled,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    isDisabled?: boolean;
    [key: string]: any;
  } = $props();

  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled));
  const slots = $derived.by(() => normalizeVariantResult(linkVariants(), "link"));
  const rootClass = $derived(slots.base?.({}) ?? "link");

  setLinkContext({
    get slots() {
      return slots;
    },
  });
</script>

<a
  aria-disabled={effectiveDisabled ? "true" : undefined}
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-slot="link"
  {...restProps}
>
  {@render children?.()}
</a>
