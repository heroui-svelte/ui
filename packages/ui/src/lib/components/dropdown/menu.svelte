<script lang="ts">
  import type {Snippet} from "svelte";

  import {DropdownMenu as BitsDropdownMenu} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getDropdownContext} from "./context";
  import {setDropdownMenuContext} from "./menu-context";

  let {
    children,
    class: className = "",
    defaultSelectedKeys = [],
    onAction,
    onSelectionChange,
    selectedKeys,
    selectionMode = "none",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultSelectedKeys?: Iterable<string>;
    onAction?: (key: string) => void;
    onSelectionChange?: (keys: Set<string>) => void;
    selectedKeys?: Iterable<string>;
    selectionMode?: "multiple" | "none" | "single";
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDropdownContext);
  const slotClass = $derived(context?.slots?.menu?.({}) ?? "dropdown__menu");
  const normalizeSelection = (input: Iterable<string> | undefined) => Array.from(input ?? []);
  const getDefaultSelectedKeys = () => normalizeSelection(defaultSelectedKeys);
  let uncontrolledSelectedKeys = $state<string[]>(getDefaultSelectedKeys());
  const currentSelectedKeys = $derived(
    selectedKeys === undefined ? uncontrolledSelectedKeys : normalizeSelection(selectedKeys),
  );

  const handleSelectionChange = (nextValues: string | string[]) => {
    const nextSelection = Array.isArray(nextValues) ? nextValues : nextValues ? [nextValues] : [];

    if (selectedKeys === undefined) {
      uncontrolledSelectedKeys = nextSelection;
    }

    onSelectionChange?.(new Set(nextSelection));
  };

  setDropdownMenuContext({
    get onAction() {
      return onAction;
    },
    get selectionMode() {
      return selectionMode;
    },
  });
</script>

<div
  class={cn(slotClass, className)}
  data-slot="dropdown-menu"
  {...restProps}
>
  {#if selectionMode === "multiple"}
    <BitsDropdownMenu.CheckboxGroup
      onValueChange={handleSelectionChange}
      value={currentSelectedKeys}
    >
      {@render children?.()}
    </BitsDropdownMenu.CheckboxGroup>
  {:else if selectionMode === "single"}
    <BitsDropdownMenu.RadioGroup
      onValueChange={handleSelectionChange}
      value={currentSelectedKeys[0] ?? ""}
    >
      {@render children?.()}
    </BitsDropdownMenu.RadioGroup>
  {:else}
    {@render children?.()}
  {/if}
</div>
