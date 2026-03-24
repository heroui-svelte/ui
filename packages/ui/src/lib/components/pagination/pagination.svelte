<script lang="ts">
  import type {Snippet} from "svelte";
  import type {PaginationVariants} from "@heroui-svelte/styles";

  import {paginationVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setPaginationContext} from "./context";

  let {
    children,
    class: className = "",
    size = "md",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    size?: PaginationVariants["size"];
    [key: string]: any;
  } = $props();

  const slots = $derived.by(() => normalizeVariantResult(paginationVariants({size}), "pagination"));
  const rootClass = $derived(slots.base?.({}) ?? "pagination");

  setPaginationContext({
    get slots() {
      return slots;
    },
  });
</script>

<nav
  aria-label="pagination"
  class={cn(rootClass, className)}
  data-slot="pagination"
  {...restProps}
>
  {@render children?.()}
</nav>
