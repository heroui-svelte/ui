<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getTimeFieldGroupContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const groupContext = safeGetContext(getTimeFieldGroupContext);
  const prefixClass = $derived(groupContext?.slots?.prefix?.({}) ?? "date-input-group__prefix");
</script>

<div class={cn(prefixClass, className)} data-slot="date-input-group-prefix" {...restProps}>
  {@render children?.()}
</div>
