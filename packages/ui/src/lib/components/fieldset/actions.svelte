<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getFieldsetContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getFieldsetContext);
  const slotClass = $derived(context?.slots?.actions?.({}) ?? "fieldset__actions");
</script>

<div class={cn(slotClass, className)} data-slot="fieldset-actions" {...restProps}>
  {@render children?.()}
</div>
