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
  const suffixClass = $derived(groupContext?.slots?.suffix?.({}) ?? "date-input-group__suffix");
</script>

<div class={cn(suffixClass, className)} data-slot="date-input-group-suffix" {...restProps}>
  {@render children?.()}
</div>
