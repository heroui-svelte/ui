<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getToastContext} from "./context";
  import CloseButton from "../close-button/close-button.svelte";

  let {
    class: className = "",
    ...restProps
  }: {
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getToastContext);
  const slotClass = $derived(context?.slots?.close?.({}) ?? "toast__close-button");
</script>

<CloseButton class={cn(slotClass, className)} data-slot="toast-close-button" {...restProps} />
