<script lang="ts">
  import type {Snippet} from "svelte";

  import {closeButtonVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";

  let {
    children,
    class: className = "",
    disabled,
    isDisabled,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    isDisabled?: boolean;
    variant?: "default";
    [key: string]: any;
  } = $props();

  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled));
  const slots = $derived.by(
    () => normalizeVariantResult(closeButtonVariants({variant}), "close-button"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "close-button");
</script>

<button
  aria-label="Close"
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-slot="close-button"
  disabled={effectiveDisabled}
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <svg
      aria-hidden="true"
      data-slot="close-button-icon"
      fill="none"
      role="presentation"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8 3.47 4.53a.75.75 0 0 1 0-1.06Z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  {/if}
</button>
