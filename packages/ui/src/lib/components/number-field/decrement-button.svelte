<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getNumberFieldContext} from "./context";

  let {
    "aria-label": ariaLabel = "Decrement value",
    children,
    class: className = "",
    disabled,
    isDisabled,
    onclick,
    slot = "decrement",
    type = "button",
    ...restProps
  }: {
    "aria-label"?: string;
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    isDisabled?: boolean;
    onclick?: (event: MouseEvent & {currentTarget: EventTarget & HTMLButtonElement}) => void;
    slot?: string;
    type?: "button" | "submit" | "reset";
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getNumberFieldContext);
  const slotClass = $derived(context?.slots?.decrementButton?.({}) ?? "number-field__decrement-button");
  const slotProps = $derived({slot});
  const currentDisabled = $derived(
    Boolean(disabled || isDisabled || context?.isDisabled || context?.isReadOnly || !context?.canDecrement),
  );

  const handleClick = (event: MouseEvent & {currentTarget: EventTarget & HTMLButtonElement}) => {
    onclick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    context?.stepBy?.(-1);
  };
</script>

<button
  aria-label={ariaLabel}
  class={cn(slotClass, className)}
  data-disabled={withDataState(currentDisabled)}
  data-slot="number-field-decrement-button"
  disabled={currentDisabled}
  onclick={handleClick}
  type={type}
  {...slotProps}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <svg
      aria-hidden="true"
      data-slot="number-field-decrement-button-icon"
      fill="none"
      height="16"
      role="presentation"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M1.75 8a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11A.75.75 0 0 1 1.75 8"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  {/if}
</button>
