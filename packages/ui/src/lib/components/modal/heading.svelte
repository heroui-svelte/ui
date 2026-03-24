<script lang="ts">
  import type {Snippet} from "svelte";

  import {Dialog as BitsDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {getModalContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  } = $props();

  const context = getModalContext();
  const slotClass = $derived(context.slots.heading?.({}) ?? "modal__heading");
</script>

{#snippet titleChild({props})}
  <h3
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-slot="modal-heading"
  >
    {@render children?.()}
  </h3>
{/snippet}

<BitsDialog.Title child={titleChild} />
