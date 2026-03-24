<script lang="ts">
  import type {Snippet} from "svelte";

  import {Accordion as BitsAccordion} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAccordionContext} from "./context";

  let {
    children,
    class: className = "",
    forceMount = false,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    forceMount?: boolean;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getAccordionContext);
  const slotClass = $derived(context?.slots.panel?.({}) ?? "accordion__panel");
</script>

{#snippet panelChild({props, open})}
  <div
    {...props}
    {...restProps}
    class={cn(props.class, slotClass, className)}
    data-expanded={open ? "true" : undefined}
    data-slot="accordion-panel"
  >
    {@render children?.()}
  </div>
{/snippet}

<BitsAccordion.Content child={panelChild} {forceMount} />
