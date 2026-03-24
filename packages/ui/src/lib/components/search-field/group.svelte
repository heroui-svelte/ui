<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getSearchFieldContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  let groupElement = $state<HTMLDivElement | null>(null);

  const context = safeGetContext(getSearchFieldContext);
  const slotClass = $derived(context?.slots?.group?.({}) ?? "search-field__group");
  const currentDisabled = $derived(Boolean(context?.isDisabled));
  const currentInvalid = $derived(Boolean(context?.isInvalid));

  const handleClick = (event: MouseEvent) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    const input = groupElement?.querySelector<HTMLInputElement>('[data-slot="search-field-input"]');

    if (input && target && target !== input && !input.contains(target)) {
      input.focus();
    }
  };
</script>

<div
  bind:this={groupElement}
  class={cn(slotClass, className)}
  data-disabled={withDataState(currentDisabled)}
  data-invalid={withDataState(currentInvalid)}
  data-slot="search-field-group"
  onclick={handleClick}
  {...restProps}
>
  {@render children?.()}
</div>
