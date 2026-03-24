<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getFieldsetContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getFieldsetContext);
  const slotClass = $derived(context?.slots?.fieldGroup?.({}) ?? "fieldset__field_group");
</script>

<div class={cn(slotClass, className)} data-slot="fieldset-field-group" {...restProps}>
  {@render children?.()}
</div>
