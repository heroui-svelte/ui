<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getInputGroupContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getInputGroupContext);
  const slotClass = $derived(context?.slots?.suffix?.({}) ?? "input-group__suffix");
</script>

<div class={cn(slotClass, className)} data-slot="input-group-suffix" {...restProps}>
  {@render children?.()}
</div>
