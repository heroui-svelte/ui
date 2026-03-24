<script lang="ts">
  import type {Snippet} from "svelte";
  import type {ColorInputGroupVariants} from "@heroui-svelte/styles";

  import {colorInputGroupVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getTextFieldContext} from "../textfield/context";
  import {setColorFieldGroupContext} from "./group-context";

  let {
    children,
    class: className = "",
    fullWidth = false,
    onclick,
    variant = "primary",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    fullWidth?: ColorInputGroupVariants["fullWidth"];
    onclick?: (event: MouseEvent) => void;
    variant?: ColorInputGroupVariants["variant"];
    [key: string]: any;
  } = $props();

  const textFieldContext = safeGetContext(getTextFieldContext);
  let groupElement = $state<HTMLDivElement | null>(null);
  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        colorInputGroupVariants({
          fullWidth,
          variant,
        }),
        "color-input-group",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "color-input-group");

  const handleClick = (event: MouseEvent) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    const input = groupElement?.querySelector<HTMLInputElement>('[data-slot="color-input-group-input"]');
    const interactiveTarget = target?.closest(
      'button, a, input, textarea, select, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])',
    );

    if (input && target && !interactiveTarget && target !== input) {
      input.focus();
    }

    onclick?.(event);
  };

  setColorFieldGroupContext({
    get describedBy() {
      return textFieldContext?.describedBy;
    },
    get inputId() {
      return textFieldContext?.inputId;
    },
    get isDisabled() {
      return textFieldContext?.isDisabled;
    },
    get isInvalid() {
      return textFieldContext?.isInvalid;
    },
    get isReadOnly() {
      return textFieldContext?.isReadOnly;
    },
    get isRequired() {
      return textFieldContext?.isRequired;
    },
    get name() {
      return textFieldContext?.name;
    },
    get slots() {
      return slots;
    },
  });
</script>

<div
  bind:this={groupElement}
  class={cn(rootClass, className)}
  data-disabled={withDataState(textFieldContext?.isDisabled)}
  data-invalid={withDataState(textFieldContext?.isInvalid)}
  data-readonly={withDataState(textFieldContext?.isReadOnly)}
  data-required={withDataState(textFieldContext?.isRequired)}
  data-slot="color-input-group"
  onclick={handleClick}
  {...restProps}
>
  {@render children?.()}
</div>
