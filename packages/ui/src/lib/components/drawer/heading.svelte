<script lang="ts">
  import type {Snippet} from "svelte";

  import {Dialog as BitsDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {getDrawerContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  } = $props();

  const context = getDrawerContext();
  const slotClass = $derived(context.slots.heading?.({}) ?? "drawer__heading");
</script>

{#snippet titleChild({props})}
  <h3
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-slot="drawer-heading"
  >
    {@render children?.()}
  </h3>
{/snippet}

<BitsDialog.Title child={titleChild} />
