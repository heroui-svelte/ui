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
  const slotClass = $derived(context?.slots?.title?.({}) ?? "alert__title");
</script>

<p class={cn(slotClass, className)} data-slot="alert-title" {...restProps}>
  {@render children?.()}
</p>
