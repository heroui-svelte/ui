<script lang="ts">
  import type {Snippet} from "svelte";

  import {Accordion as BitsAccordion} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAccordionContext} from "./context";

  let {
    children,
    class: className = "",
    level = 3,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getAccordionContext);
  const slotClass = $derived(context?.slots.heading?.({}) ?? "accordion__heading");
</script>

<BitsAccordion.Header
  class={cn(slotClass, className)}
  data-slot="accordion-heading"
  {level}
  {...restProps}
>
  {@render children?.()}
</BitsAccordion.Header>
