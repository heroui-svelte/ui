<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getPaginationContext} from "./context";

  let {
    children,
    class: className = "",
    disabled,
    href,
    isActive = false,
    isDisabled,
    onclick,
    type = "button",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    href?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    onclick?: (event: MouseEvent) => void;
    type?: "button" | "reset" | "submit";
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getPaginationContext);
  const slotClass = $derived(context?.slots?.link?.({}) ?? "pagination__link");
  const currentDisabled = $derived(Boolean(disabled ?? isDisabled));
  const currentHref = $derived(currentDisabled ? undefined : href);

  const handleClick = (event: MouseEvent) => {
    if (currentDisabled) {
      event.preventDefault();
      event.stopPropagation();

      return;
    }

    onclick?.(event);
  };
</script>

{#if href !== undefined}
  <a
    aria-current={isActive ? "page" : undefined}
    aria-disabled={currentDisabled ? "true" : undefined}
    class={cn(slotClass, className)}
    data-active={withDataState(isActive)}
    data-disabled={withDataState(currentDisabled)}
    data-slot="pagination-link"
    href={currentHref}
    onclick={handleClick}
    tabindex={currentDisabled ? -1 : undefined}
    {...restProps}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    aria-current={isActive ? "page" : undefined}
    aria-disabled={currentDisabled ? "true" : undefined}
    class={cn(slotClass, className)}
    data-active={withDataState(isActive)}
    data-disabled={withDataState(currentDisabled)}
    data-slot="pagination-link"
    disabled={currentDisabled}
    onclick={handleClick}
    {type}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
