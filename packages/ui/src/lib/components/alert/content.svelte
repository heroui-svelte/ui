<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAlertContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getAlertContext);
  const slotClass = $derived(context?.slots?.content?.({}) ?? "alert__content");
</script>

<div class={cn(slotClass, className)} data-slot="alert-content" {...restProps}>
  {@render children?.()}
</div>
