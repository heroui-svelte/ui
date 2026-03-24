<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getComboBoxContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getComboBoxContext);
  const slotClass = $derived(context?.slots?.inputGroup?.({}) ?? "combo-box__input-group");
</script>

<div
  class={cn(slotClass, className)}
  data-slot="combo-box-input-group"
  {...restProps}
>
  {@render children?.()}
</div>
