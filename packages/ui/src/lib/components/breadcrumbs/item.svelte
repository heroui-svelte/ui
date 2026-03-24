<script lang="ts">
  import type {Snippet} from "svelte";

  import IconChevronRight from "../../icons/IconChevronRight.svelte";
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getBreadcrumbsContext} from "./context";

  let {
    children,
    class: className = "",
    current,
    href,
    isCurrent,
    isDisabled,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    current?: boolean;
    href?: string;
    isCurrent?: boolean;
    isDisabled?: boolean;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getBreadcrumbsContext);
  const itemClass = $derived(context?.slots?.item?.({}) ?? "breadcrumbs__item");
  const linkClass = $derived(context?.slots?.link?.({}) ?? "breadcrumbs__link");
  const separatorClass = $derived(context?.slots?.separator?.({}) ?? "breadcrumbs__separator");
  const currentItem = $derived(Boolean(current ?? isCurrent ?? !href));
  const disabledItem = $derived(Boolean(isDisabled ?? context?.isDisabled));
</script>

<span
  class={cn(itemClass, className)}
  data-current={withDataState(currentItem)}
  data-disabled={withDataState(disabledItem)}
  data-slot="breadcrumbs-item"
  {...restProps}
>
  {#if href}
    <a
      aria-current={currentItem ? "page" : undefined}
      aria-disabled={disabledItem ? "true" : undefined}
      class={linkClass}
      data-current={withDataState(currentItem)}
      data-disabled={withDataState(disabledItem)}
      data-slot="breadcrumbs-link"
      href={disabledItem ? undefined : href}
    >
      {@render children?.()}
    </a>
  {:else}
    <span
      aria-current={currentItem ? "page" : undefined}
      class={linkClass}
      data-current={withDataState(currentItem)}
      data-disabled={withDataState(disabledItem)}
      data-slot="breadcrumbs-link"
    >
      {@render children?.()}
    </span>
  {/if}

  {#if !currentItem}
    {#if context?.separator}
      <span class={separatorClass} data-slot="breadcrumbs-separator">
        {@render context.separator?.()}
      </span>
    {:else}
      <IconChevronRight class={separatorClass} data-slot="breadcrumbs-separator" />
    {/if}
  {/if}
</span>
