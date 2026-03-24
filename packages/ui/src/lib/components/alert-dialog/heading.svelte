<script lang="ts">
  import type {Snippet} from "svelte";

  import {AlertDialog as BitsAlertDialog} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {getAlertDialogContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  } = $props();

  const context = getAlertDialogContext();
  const slotClass = $derived(context.slots.heading?.({}) ?? "alert-dialog__heading");
</script>

{#snippet titleChild({props})}
  <h3
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-slot="alert-dialog-heading"
  >
    {@render children?.()}
  </h3>
{/snippet}

<BitsAlertDialog.Title child={titleChild} />
