<script lang="ts">
  import type {Snippet} from "svelte";

  import {DropdownMenu as BitsDropdownMenu} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getDropdownContext} from "./context";

  let {
    children,
    class: className = "",
    isDisabled = false,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    isDisabled?: boolean;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDropdownContext);
  const slotClass = $derived(context?.slots?.trigger?.({}) ?? "dropdown__trigger");
</script>

{#snippet triggerChild({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-slot="dropdown-trigger"
  >
    {@render children?.()}
  </button>
{/snippet}

<BitsDropdownMenu.Trigger child={triggerChild} disabled={isDisabled} />
