<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getColorFieldGroupContext} from "./group-context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const groupContext = safeGetContext(getColorFieldGroupContext);
  const slotClass = $derived(groupContext?.slots?.prefix?.({}) ?? "color-input-group__prefix");
</script>

<div class={cn(slotClass, className)} data-slot="color-input-group-prefix" {...restProps}>
  {@render children?.()}
</div>
