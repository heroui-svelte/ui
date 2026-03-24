<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getMeterContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getMeterContext);
  const slotClass = $derived(context?.slots?.track?.({}) ?? "meter__track");
</script>

<div class={cn(slotClass, className)} data-slot="meter-track" {...restProps}>
  {@render children?.()}
</div>
