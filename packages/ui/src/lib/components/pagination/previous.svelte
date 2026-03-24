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
    isDisabled,
    onclick,
    type = "button",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    href?: string;
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
    aria-disabled={currentDisabled ? "true" : undefined}
    class={cn(slotClass, "pagination__link--nav", className)}
    data-disabled={withDataState(currentDisabled)}
    data-slot="pagination-previous"
    href={currentHref}
    onclick={handleClick}
    tabindex={currentDisabled ? -1 : undefined}
    {...restProps}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    aria-disabled={currentDisabled ? "true" : undefined}
    class={cn(slotClass, "pagination__link--nav", className)}
    data-disabled={withDataState(currentDisabled)}
    data-slot="pagination-previous"
    disabled={currentDisabled}
    onclick={handleClick}
    {type}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
