<script lang="ts">
  import {cn} from "../../internal/cn";
  import {getDrawerContext} from "./context";

  let {
    class: className = "",
    ...restProps
  }: {
    class?: string;
    [key: string]: unknown;
  } = $props();

  const context = getDrawerContext();
  const slotClass = $derived(context.slots.handle?.({}) ?? "drawer__handle");
</script>

<span
  class={cn(slotClass, className)}
  aria-hidden="true"
  data-slot="drawer-handle"
  {...restProps}
>
  <span data-slot="drawer-handle-bar"></span>
</span>
