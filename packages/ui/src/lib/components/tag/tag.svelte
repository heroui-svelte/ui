<script lang="ts">
  import type {Snippet} from "svelte";

  import type {TagVariants} from "@heroui-svelte/styles";

  import {tagVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getTagGroupContext} from "../tag-group/context";
  import {setTagContext} from "./context";
  import TagRemoveButton from "./remove-button.svelte";

  let {
    allowsRemoving = false,
    children,
    class: className = "",
    defaultSelected = false,
    disabled,
    id,
    isDisabled,
    isSelected,
    onRemove,
    onSelectionChange,
    size,
    value,
    variant,
    ...restProps
  }: {
    allowsRemoving?: boolean;
    children?: Snippet;
    class?: string;
    defaultSelected?: boolean;
    disabled?: boolean;
    id?: string | number;
    isDisabled?: boolean;
    isSelected?: boolean;
    onRemove?: () => void;
    onSelectionChange?: (selected: boolean) => void;
    size?: TagVariants["size"];
    value?: string | number;
    variant?: TagVariants["variant"];
    [key: string]: any;
  } = $props();

  const groupContext = safeGetContext(getTagGroupContext);
  const fallbackValue = `tag-${Math.random().toString(36).slice(2)}`;
  const resolvedValue = $derived(String(value ?? id ?? fallbackValue));
  const finalSize = $derived(size ?? groupContext?.size);
  const finalVariant = $derived(variant ?? groupContext?.variant);
  const disabledFromGroup = $derived(groupContext?.disabledValues?.includes(resolvedValue) ?? false);
  const finalDisabled = $derived(Boolean(disabled ?? isDisabled ?? groupContext?.isDisabled ?? disabledFromGroup));
  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        tagVariants({
          size: finalSize,
          variant: finalVariant,
        }),
        "tag",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "tag");

  const getDefaultSelected = () => defaultSelected;

  let uncontrolledSelected = $state(getDefaultSelected());
  const currentSelected = $derived(
    groupContext?.selectionMode && groupContext.selectionMode !== "none"
      ? (groupContext.selectedValues?.includes(resolvedValue) ?? false)
      : (isSelected ?? uncontrolledSelected),
  );
  const showRemoveButton = $derived(Boolean(allowsRemoving || onRemove));

  const handleSelectionToggle = () => {
    if (finalDisabled) {
      return;
    }

    if (groupContext?.selectionMode && groupContext.selectionMode !== "none") {
      groupContext.toggleValue?.(resolvedValue);
      onSelectionChange?.(!(groupContext.selectedValues?.includes(resolvedValue) ?? false));

      return;
    }

    const nextSelected = !currentSelected;

    if (isSelected === undefined) {
      uncontrolledSelected = nextSelected;
    }

    onSelectionChange?.(nextSelected);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== " " && event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    handleSelectionToggle();
  };

  const handleRemove = () => {
    onRemove?.();
    groupContext?.removeValue?.(resolvedValue);
  };

  setTagContext({
    get isDisabled() {
      return finalDisabled;
    },
    get isSelected() {
      return currentSelected;
    },
    get onRemove() {
      return showRemoveButton ? handleRemove : undefined;
    },
    get slots() {
      return slots;
    },
  });
</script>

{#if showRemoveButton}
  <div
    aria-disabled={finalDisabled ? "true" : undefined}
    aria-selected={currentSelected ? "true" : undefined}
    class={cn(rootClass, className)}
    data-disabled={withDataState(finalDisabled)}
    data-selected={withDataState(currentSelected)}
    data-slot="tag"
    onclick={handleSelectionToggle}
    role={groupContext?.selectionMode && groupContext.selectionMode !== "none" ? "option" : "group"}
    {...restProps}
  >
    {@render children?.()}
    <TagRemoveButton />
  </div>
{:else}
  <button
    aria-disabled={finalDisabled ? "true" : undefined}
    aria-pressed={currentSelected ? "true" : undefined}
    class={cn(rootClass, className)}
    data-disabled={withDataState(finalDisabled)}
    data-selected={withDataState(currentSelected)}
    data-slot="tag"
    disabled={finalDisabled}
    onkeydown={handleKeydown}
    onclick={handleSelectionToggle}
    type="button"
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
