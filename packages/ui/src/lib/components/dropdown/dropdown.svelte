<script lang="ts">
  import type {Snippet} from "svelte";

  import {DropdownMenu as BitsDropdownMenu} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {dropdownVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setDropdownContext} from "./context";

  let {
    children,
    class: className = "",
    open = $bindable(false),
  }: {
    children?: Snippet;
    class?: string;
    open?: boolean;
  } = $props();

  const slots = $derived.by(() =>
    normalizeVariantResult(dropdownVariants(), "dropdown"),
  );
  setDropdownContext({
    get open() {
      return open;
    },
    get slots() {
      return slots;
    },
  });
</script>

<BitsDropdownMenu.Root bind:open>
  <div class={cn(slots.root?.({}) ?? "dropdown", className)} data-open={open ? "true" : undefined} data-slot="dropdown">
    {@render children?.()}
  </div>
</BitsDropdownMenu.Root>
