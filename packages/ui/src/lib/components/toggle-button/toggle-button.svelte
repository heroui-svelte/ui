<script lang="ts">
  import type {Snippet} from "svelte";

  import type {ToggleButtonVariants} from "@heroui-svelte/styles";

  import {Toggle as BitsToggle, ToggleGroup as BitsToggleGroup} from "bits-ui";
  import {toggleButtonVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getToggleButtonGroupContext} from "../toggle-button-group/context";

  let {
    children,
    class: className = "",
    defaultPressed,
    defaultSelected = false,
    disabled,
    id,
    isDisabled,
    isIconOnly = false,
    isSelected,
    onChange,
    onPressedChange,
    onSelectionChange,
    pressed,
    size,
    value,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultPressed?: boolean;
    defaultSelected?: boolean;
    disabled?: boolean;
    id?: string | number;
    isDisabled?: boolean;
    isIconOnly?: boolean;
    isSelected?: boolean;
    onChange?: (selected: boolean) => void;
    onPressedChange?: (selected: boolean) => void;
    onSelectionChange?: (selected: boolean) => void;
    pressed?: boolean;
    size?: ToggleButtonVariants["size"];
    value?: string | number;
    variant?: ToggleButtonVariants["variant"];
    [key: string]: any;
  } = $props();

  const groupContext = safeGetContext(getToggleButtonGroupContext);
  const fallbackValue = `toggle-button-${Math.random().toString(36).slice(2)}`;
  const resolvedValue = $derived(String(value ?? id ?? fallbackValue));
  const finalSize = $derived(size ?? groupContext?.size);
  const finalDisabled = $derived(Boolean(disabled ?? isDisabled ?? groupContext?.isDisabled));
  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        toggleButtonVariants({
          isIconOnly,
          size: finalSize,
          variant,
        }),
        "toggle-button",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "toggle-button");

  const getDefaultPressed = () => Boolean(defaultPressed ?? defaultSelected);

  let uncontrolledPressed = $state(getDefaultPressed());
  const currentPressed = $derived(pressed ?? isSelected ?? uncontrolledPressed);

  const handlePressedChange = (nextPressed: boolean) => {
    if (pressed === undefined && isSelected === undefined) {
      uncontrolledPressed = nextPressed;
    }

    onPressedChange?.(nextPressed);
    onChange?.(nextPressed);
    onSelectionChange?.(nextPressed);
  };
</script>

{#snippet standaloneChild({props, pressed})}
  <button
    {...props}
    {...restProps}
    aria-pressed={pressed}
    class={cn(props.class, rootClass, className)}
    data-disabled={withDataState(finalDisabled)}
    data-selected={withDataState(pressed)}
    data-slot="toggle-button"
  >
    {@render children?.()}
  </button>
{/snippet}

{#snippet groupChild({props, pressed})}
  <button
    {...props}
    {...restProps}
    aria-pressed={pressed}
    class={cn(props.class, rootClass, className)}
    data-disabled={withDataState(finalDisabled)}
    data-selected={withDataState(pressed)}
    data-slot="toggle-button"
  >
    {@render children?.()}
  </button>
{/snippet}

{#if groupContext}
  <BitsToggleGroup.Item child={groupChild} disabled={finalDisabled} value={resolvedValue} />
{:else}
  <BitsToggle.Root
    child={standaloneChild}
    disabled={finalDisabled}
    onPressedChange={handlePressedChange}
    pressed={currentPressed}
  />
{/if}
