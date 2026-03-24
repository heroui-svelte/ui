<script lang="ts">
  import type {Snippet} from "svelte";

  import {DropdownMenu as BitsDropdownMenu} from "bits-ui";
  import {setDropdownSubmenuContext} from "./submenu-context";

  let {
    children,
  }: {
    children?: Snippet;
  } = $props();

  setDropdownSubmenuContext(true);
</script>

<BitsDropdownMenu.Sub>
  {@render children?.()}
</BitsDropdownMenu.Sub>
