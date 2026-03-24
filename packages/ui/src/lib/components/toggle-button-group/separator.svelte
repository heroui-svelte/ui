<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getToggleButtonGroupContext} from "./context";

  let {
    class: className = "",
    ...restProps
  }: {
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getToggleButtonGroupContext);
  const slotClass = $derived(context?.slots?.separator?.({}) ?? "toggle-button-group__separator");
</script>

<span
  aria-hidden="true"
  class={cn(slotClass, className)}
  data-slot="toggle-button-group-separator"
  {...restProps}
></span>
