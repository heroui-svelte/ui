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
  const slotClass = $derived(context?.slots?.description?.({}) ?? "alert__description");
</script>

<span class={cn(slotClass, className)} data-slot="alert-description" {...restProps}>
  {@render children?.()}
</span>
