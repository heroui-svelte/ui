<script lang="ts">
  import type {Snippet} from "svelte";

  import {breadcrumbsVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setBreadcrumbsContext} from "./context";

  let {
    children,
    class: className = "",
    isDisabled = false,
    separator,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    isDisabled?: boolean;
    separator?: Snippet;
    [key: string]: any;
  } = $props();

  const slots = $derived.by(() => normalizeVariantResult(breadcrumbsVariants(), "breadcrumbs"));
  const rootClass = $derived(slots.base?.({}) ?? "breadcrumbs");

  setBreadcrumbsContext({
    get isDisabled() {
      return isDisabled;
    },
    get separator() {
      return separator;
    },
    get slots() {
      return slots;
    },
  });
</script>

<nav
  class={cn(rootClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-slot="breadcrumbs"
  {...restProps}
>
  {@render children?.()}
</nav>
