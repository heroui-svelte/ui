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
  const containerClass = $derived(
    groupContext?.slots?.inputContainer?.({}) ?? "date-input-group__input-container",
  );
</script>

<div class={cn(containerClass, className)} data-slot="date-input-group-input-container" {...restProps}>
  {@render children?.()}
</div>
