<script lang="ts">
  import type {Snippet} from "svelte";
  import type {TableVariants} from "@heroui-svelte/styles";

  import {tableVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setTableContext} from "./context";

  let {
    children,
    class: className = "",
    variant = "primary",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    variant?: TableVariants["variant"];
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () => normalizeVariantResult(tableVariants({variant}), "table"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "table-root");

  setTableContext({
    get slots() {
      return slots;
    },
  });
</script>

<div class={cn(rootClass, className)} data-slot="table" {...restProps}>
  {@render children?.()}
</div>
