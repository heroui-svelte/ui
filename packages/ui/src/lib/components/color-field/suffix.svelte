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
  const slotClass = $derived(groupContext?.slots?.suffix?.({}) ?? "color-input-group__suffix");
</script>

<div class={cn(slotClass, className)} data-slot="color-input-group-suffix" {...restProps}>
  {@render children?.()}
</div>
