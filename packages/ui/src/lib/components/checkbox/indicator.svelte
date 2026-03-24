<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getCheckboxContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getCheckboxContext);
  const slotClass = $derived(context?.slots?.indicator?.({}) ?? "checkbox__indicator");
  const isDisabled = $derived(context?.isDisabled ?? false);
  const isIndeterminate = $derived(context?.isIndeterminate ?? false);
  const isInvalid = $derived(context?.isInvalid ?? false);
  const isReadOnly = $derived(context?.isReadOnly ?? false);
  const isRequired = $derived(context?.isRequired ?? false);
  const isSelected = $derived(context?.isSelected ?? false);
</script>

<span
  aria-hidden="true"
  class={cn(slotClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-indeterminate={withDataState(isIndeterminate)}
  data-invalid={withDataState(isInvalid)}
  data-readonly={withDataState(isReadOnly)}
  data-required={withDataState(isRequired)}
  data-selected={withDataState(isSelected)}
  data-slot="checkbox-indicator"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else if isIndeterminate}
    <svg
      aria-hidden="true"
      data-slot="checkbox-default-indicator--indeterminate"
      fill="none"
      role="presentation"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="3"
      viewBox="0 0 24 24"
    >
      <line x1="21" x2="3" y1="12" y2="12" />
    </svg>
  {:else}
    <svg
      aria-hidden="true"
      data-slot="checkbox-default-indicator--checkmark"
      fill="none"
      role="presentation"
      stroke="currentColor"
      stroke-dasharray={22}
      stroke-dashoffset={isSelected ? 44 : 66}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 17 18"
    >
      <polyline points="1 9 7 14 15 4" />
    </svg>
  {/if}
</span>
