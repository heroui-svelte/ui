<script lang="ts">
  import type {Snippet} from "svelte";

  import {Accordion as BitsAccordion} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAccordionContext} from "./context";

  let {
    children,
    class: className = "",
    id,
    isDisabled = false,
    value,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    id?: string | number;
    isDisabled?: boolean;
    value?: string | number;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getAccordionContext);
  const slotClass = $derived(context?.slots.item?.({}) ?? "accordion__item");
  const resolvedValue = $derived(
    value === undefined && id === undefined ? undefined : String(value ?? id),
  );
</script>

<BitsAccordion.Item
  class={cn(slotClass, className)}
  data-hide-separator={context?.hideSeparator ? "true" : undefined}
  data-slot="accordion-item"
  disabled={isDisabled}
  value={resolvedValue}
  {...restProps}
>
  {@render children?.()}
</BitsAccordion.Item>
