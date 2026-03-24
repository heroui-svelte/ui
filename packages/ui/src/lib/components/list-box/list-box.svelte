<script lang="ts">
  import type {Snippet} from "svelte";

  import {Combobox as BitsCombobox, Select as BitsSelect} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {listboxVariants} from "@heroui-svelte/styles";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getComboBoxContext} from "../combo-box/context";
  import {getSelectContext} from "../select/context";

  let {
    children,
    class: className = "",
    isDisabled,
    isInvalid,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    variant?: "danger" | "default";
    [key: string]: any;
  } = $props();

  const selectContext = safeGetContext(getSelectContext);
  const comboBoxContext = safeGetContext(getComboBoxContext);
  const slots = $derived.by(() =>
    normalizeVariantResult(
      listboxVariants({variant}),
      "list-box",
    ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "list-box");
</script>

{#if comboBoxContext}
  <BitsCombobox.Viewport
    class={cn(rootClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-invalid={withDataState(isInvalid)}
    data-slot="list-box"
    {...restProps}
  >
    {@render children?.()}
  </BitsCombobox.Viewport>
{:else if selectContext}
  <BitsSelect.Viewport
    class={cn(rootClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-invalid={withDataState(isInvalid)}
    data-slot="list-box"
    {...restProps}
  >
    {@render children?.()}
  </BitsSelect.Viewport>
{:else}
  <div
    aria-multiselectable={selectContext?.type === "multiple" ? "true" : undefined}
    class={cn(rootClass, className)}
    data-disabled={withDataState(isDisabled)}
    data-invalid={withDataState(isInvalid)}
    data-slot="list-box"
    role="listbox"
    {...restProps}
  >
    {@render children?.()}
  </div>
{/if}
