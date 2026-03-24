<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getToastContext} from "./context";
  import Spinner from "../spinner/spinner.svelte";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getToastContext);
  const slotClass = $derived(context?.slots?.indicator?.({}) ?? "toast__indicator");
  const isLoading = $derived(Boolean(context?.isLoading));
  const variant = $derived(context?.variant ?? "default");
</script>

<div class={cn(slotClass, className)} data-slot="toast-indicator" {...restProps}>
  {#if children}
    {@render children?.()}
  {:else if isLoading}
    <Spinner color="current" size="sm" />
  {:else if variant === "success"}
    <svg
      aria-hidden="true"
      data-slot="toast-default-icon"
      fill="none"
      role="presentation"
      viewBox="0 0 16 16"
    >
      <path
        d="M4 8.25 6.5 10.75 12 5.25"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
    </svg>
  {:else if variant === "warning"}
    <svg
      aria-hidden="true"
      data-slot="toast-default-icon"
      fill="none"
      role="presentation"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 2.5 13 12.5H3L8 2.5Z"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="1.2"
      />
      <path
        d="M8 6V8.75"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.2"
      />
      <circle cx="8" cy="11" r=".75" fill="currentColor" />
    </svg>
  {:else if variant === "danger"}
    <svg
      aria-hidden="true"
      data-slot="toast-default-icon"
      fill="none"
      role="presentation"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" stroke-width="1.5" />
      <path
        d="M8 5V8.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.5"
      />
      <circle cx="8" cy="11" r=".8" fill="currentColor" />
    </svg>
  {:else}
    <svg
      aria-hidden="true"
      data-slot="toast-default-icon"
      fill="none"
      role="presentation"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" stroke-width="1.5" />
      <path
        d="M8 7.25V11"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.5"
      />
      <circle cx="8" cy="5" r=".8" fill="currentColor" />
    </svg>
  {/if}
</div>
