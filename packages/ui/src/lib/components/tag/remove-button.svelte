<script lang="ts">
  import type {Snippet} from "svelte";

  import IconClose from "../../icons/IconClose.svelte";
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getTagContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getTagContext);
  const slotClass = $derived(context?.slots?.removeButton?.({}) ?? "tag__remove-button");
  const isDisabled = $derived(context?.isDisabled ?? false);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    context?.onRemove?.();
  };
</script>

<button
  class={cn(slotClass, className)}
  data-disabled={withDataState(isDisabled)}
  data-slot="tag-remove-button"
  disabled={isDisabled}
  onclick={handleClick}
  type="button"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <IconClose data-slot="tag-remove-button-icon" height={12} width={12} />
  {/if}
</button>
