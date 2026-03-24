<script lang="ts">
  import type {Snippet} from "svelte";

  import {Combobox as BitsCombobox, Select as BitsSelect} from "bits-ui";

  import {listboxItemVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getComboBoxContext} from "../combo-box/context";
  import {getSelectContext} from "../select/context";
  import {setListBoxItemContext} from "./context";

  let {
    children,
    class: className = "",
    id,
    isDisabled,
    label,
    textValue,
    value,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    id?: string;
    isDisabled?: boolean;
    label?: string;
    textValue?: string;
    value?: string;
    variant?: "danger" | "default";
    [key: string]: any;
  } = $props();

  const comboBoxContext = safeGetContext(getComboBoxContext);
  const selectContext = safeGetContext(getSelectContext);
  const slots = $derived.by(() =>
    normalizeVariantResult(
      listboxItemVariants({variant}),
      "list-box-item",
    ),
  );
  const rootClass = $derived(slots.item?.({}) ?? "list-box-item");
  const itemLabel = $derived(textValue ?? label ?? value ?? id ?? "");
  const itemValue = $derived(value ?? id ?? itemLabel);

  $effect(() => {
    if (!itemValue) {
      return;
    }

    selectContext?.registerItem?.({
      disabled: Boolean(isDisabled),
      label: itemLabel,
      value: itemValue,
    });

    comboBoxContext?.registerItem?.(itemValue, itemLabel);
  });

  setListBoxItemContext({
    get slots() {
      return slots;
    },
  });
</script>

{#if comboBoxContext && itemValue}
  {#snippet comboItem({props, highlighted, selected})}
    <div
      {...props}
      {...restProps}
      class={cn(props.class, rootClass, className)}
      data-disabled={props["data-disabled"] !== undefined ? "true" : undefined}
      data-focus-visible={props["data-highlighted"] !== undefined ? "true" : undefined}
      data-hovered={props["data-highlighted"] !== undefined ? "true" : undefined}
      data-selected={props["data-selected"] !== undefined ? "true" : undefined}
      data-slot="list-box-item"
    >
      {#if children}
        {@render children()}
      {:else}
        {itemLabel}
      {/if}
    </div>
  {/snippet}

  <BitsCombobox.Item
    child={comboItem}
    disabled={Boolean(isDisabled)}
    label={itemLabel}
    value={itemValue}
  />
{:else if selectContext && itemValue}
  {#snippet selectItem({props, highlighted, selected})}
    <div
      {...props}
      {...restProps}
      class={cn(props.class, rootClass, className)}
      data-disabled={props["data-disabled"] !== undefined ? "true" : undefined}
      data-focus-visible={props["data-highlighted"] !== undefined ? "true" : undefined}
      data-hovered={props["data-highlighted"] !== undefined ? "true" : undefined}
      data-selected={props["data-selected"] !== undefined ? "true" : undefined}
      data-slot="list-box-item"
    >
      {#if children}
        {@render children()}
      {:else}
        {itemLabel}
      {/if}
    </div>
  {/snippet}

  <BitsSelect.Item
    child={selectItem}
    disabled={Boolean(isDisabled)}
    label={itemLabel}
    value={itemValue}
  />
{:else}
  <div
    class={cn(rootClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-slot="list-box-item"
    {...restProps}
  >
    {#if children}
      {@render children()}
    {:else}
      {itemLabel}
    {/if}
  </div>
{/if}
