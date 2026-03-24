<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getToastContext} from "./context";
  import Button from "../button/button.svelte";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getToastContext);
  const slotClass = $derived(context?.slots?.action?.({}) ?? "toast__action");
</script>

<Button class={cn(slotClass, className)} data-slot="toast-action-button" {...restProps}>
  {#if children}
    {@render children?.()}
  {/if}
</Button>
