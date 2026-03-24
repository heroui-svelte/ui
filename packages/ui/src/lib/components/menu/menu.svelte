<script lang="ts">
  import type {Snippet} from "svelte";

  import {DropdownMenu as BitsDropdownMenu} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {menuVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setMenuContext} from "./context";

  let {
    children,
    class: className = "",
    defaultSelectedKeys = [],
    dir = "ltr",
    loop = false,
    onAction,
    onSelectionChange,
    selectedKeys,
    selectionMode = "none",
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultSelectedKeys?: Iterable<string>;
    dir?: "ltr" | "rtl";
    loop?: boolean;
    onAction?: (key: string) => void;
    onSelectionChange?: (keys: Set<string>) => void;
    selectedKeys?: Iterable<string>;
    selectionMode?: "multiple" | "none" | "single";
    variant?: never;
    [key: string]: any;
  } = $props();

  const normalizeSelection = (input: Iterable<string> | undefined) => Array.from(input ?? []);
  const getDefaultSelectedKeys = () => normalizeSelection(defaultSelectedKeys);
  let uncontrolledSelectedKeys = $state<string[]>(getDefaultSelectedKeys());

  const slots = $derived.by(() =>
    normalizeVariantResult(menuVariants(), "menu"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "menu");
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

  setMenuContext({
    get onAction() {
      return onAction;
    },
    get selectionMode() {
      return selectionMode;
    },
    get slots() {
      return slots;
    },
  });
</script>

<BitsDropdownMenu.Root dir={dir} open>
  <BitsDropdownMenu.ContentStatic class={cn(rootClass, className)} data-slot="menu" {loop} {...restProps}>
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
  </BitsDropdownMenu.ContentStatic>
</BitsDropdownMenu.Root>
