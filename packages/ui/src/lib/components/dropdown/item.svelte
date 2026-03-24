<script lang="ts">
  import type {Snippet} from "svelte";

  import {DropdownMenu as BitsDropdownMenu} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {menuItemVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setMenuItemContext} from "../menu-item/context";
  import {getDropdownMenuContext} from "./menu-context";
  import {getDropdownSubmenuContext} from "./submenu-context";

  let {
    children,
    class: className = "",
    closeOnSelect = true,
    id,
    isDisabled = false,
    onSelect,
    textValue,
    variant,
    value,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    closeOnSelect?: boolean;
    id?: string;
    isDisabled?: boolean;
    onSelect?: (event: Event) => void;
    textValue?: string;
    value?: string;
    variant?: "danger" | "default";
    [key: string]: any;
  } = $props();

  const menuContext = safeGetContext(getDropdownMenuContext);
  const isSubmenu = safeGetContext(getDropdownSubmenuContext) ?? false;
  const slots = $derived.by(() =>
    normalizeVariantResult(menuItemVariants({variant}), "menu-item"),
  );
  const slotClass = $derived(slots.item?.({}) ?? "menu-item");
  const itemValue = $derived(String(value ?? id ?? textValue ?? ""));

  const handleSelect = (event: Event) => {
    onSelect?.(event);
    menuContext?.onAction?.(itemValue);
  };

  setMenuItemContext({
    hasSubmenu: isSubmenu,
    get slots() {
      return slots;
    },
  });
</script>

{#if !menuContext && !isSubmenu}
  <div
    class={cn(slotClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-slot="menu-item"
    {...restProps}
  >
    {@render children?.()}
  </div>
{:else if isSubmenu}
  <BitsDropdownMenu.SubTrigger
    class={cn(slotClass, className)}
    data-has-submenu="true"
    data-slot="menu-item"
    disabled={isDisabled}
    onSelect={handleSelect}
    textValue={textValue}
    {...restProps}
  >
    {@render children?.()}
  </BitsDropdownMenu.SubTrigger>
{:else if menuContext?.selectionMode === "multiple"}
  <BitsDropdownMenu.CheckboxItem
    class={cn(slotClass, className)}
    closeOnSelect={closeOnSelect}
    data-selection-mode="multiple"
    data-slot="menu-item"
    disabled={isDisabled}
    onSelect={handleSelect}
    value={itemValue}
    {...restProps}
  >
    {@render children?.()}
  </BitsDropdownMenu.CheckboxItem>
{:else if menuContext?.selectionMode === "single"}
  <BitsDropdownMenu.RadioItem
    class={cn(slotClass, className)}
    closeOnSelect={closeOnSelect}
    data-selection-mode="single"
    data-slot="menu-item"
    disabled={isDisabled}
    onSelect={handleSelect}
    value={itemValue}
    {...restProps}
  >
    {@render children?.()}
  </BitsDropdownMenu.RadioItem>
{:else}
  <BitsDropdownMenu.Item
    class={cn(slotClass, className)}
    closeOnSelect={closeOnSelect}
    data-slot="menu-item"
    disabled={isDisabled}
    onSelect={handleSelect}
    textValue={textValue}
    {...restProps}
  >
    {@render children?.()}
  </BitsDropdownMenu.Item>
{/if}
