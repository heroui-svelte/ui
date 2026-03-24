<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getInputOTPContext} from "./context";

  let {
    children,
    class: className = "",
    cell,
    index,
    ...restProps
  }: {
    children?: Snippet;
    cell?: {
      char: string | null | undefined;
      hasFakeCaret: boolean;
      isActive: boolean;
    };
    class?: string;
    index?: number;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getInputOTPContext);
  const slotClass = $derived(context?.slots?.slot?.({}) ?? "input-otp__slot");
  const slotValueClass = $derived(context?.slots?.slotValue?.({}) ?? "input-otp__slot-value");
  const caretClass = $derived(context?.slots?.caret?.({}) ?? "input-otp__caret");
  const resolvedCell = $derived.by(() => {
    if (cell) {
      return cell;
    }

    if (index === undefined) {
      return undefined;
    }

    const value = context?.value ?? "";
    const char = value[index];
    const valueLength = value.length;
    const maxLength = context?.maxLength ?? valueLength;
    const isCurrentSlot = index === Math.min(valueLength, Math.max(maxLength - 1, 0));

    return {
      char,
      hasFakeCaret: !char && valueLength < maxLength && isCurrentSlot,
      isActive: !char && valueLength < maxLength && isCurrentSlot,
    };
  });
</script>

{#if resolvedCell}
  <div
    class={cn(slotClass, className)}
    data-active={resolvedCell.isActive ? "true" : undefined}
    data-disabled={context?.isDisabled ? "true" : undefined}
    data-filled={resolvedCell.char ? "true" : undefined}
    data-invalid={context?.isInvalid ? "true" : undefined}
    data-slot="input-otp-slot"
    {...restProps}
  >
    {#if children}
      {@render children?.()}
    {:else}
      {#if resolvedCell.char}
        <span class={slotValueClass} data-slot="input-otp-slot-value">
          {resolvedCell.char}
        </span>
      {/if}
      {#if resolvedCell.hasFakeCaret && resolvedCell.isActive}
        <span class={caretClass} data-slot="input-otp-caret"></span>
      {/if}
    {/if}
  </div>
{/if}
