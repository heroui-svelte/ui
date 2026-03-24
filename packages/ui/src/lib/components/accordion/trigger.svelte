<script lang="ts">
  import type {Snippet} from "svelte";

  import {Accordion as BitsAccordion} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAccordionContext} from "./context";

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

  const context = safeGetContext(getAccordionContext);
  const slotClass = $derived(context?.slots.trigger?.({}) ?? "accordion__trigger");
</script>

{#snippet triggerChild({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-slot="accordion-trigger"
  >
    {@render children?.()}
  </button>
{/snippet}

<BitsAccordion.Trigger child={triggerChild} disabled={isDisabled} />
