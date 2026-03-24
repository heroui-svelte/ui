<script lang="ts">
  import {
    Accordion,
    AccordionBody,
    AccordionHeading,
    AccordionIndicator,
    AccordionItem,
    AccordionPanel,
    AccordionTrigger,
  } from "../../components/accordion";

  let {
    defaultExpandedKeys = ["payment"],
    onExpandedChange,
  }: {
    defaultExpandedKeys?: string[];
    onExpandedChange?: (keys: Set<string>) => void;
  } = $props();
</script>

<Accordion defaultExpandedKeys={defaultExpandedKeys} onExpandedChange={onExpandedChange}>
  <AccordionItem id="payment">
    <AccordionHeading>
      <AccordionTrigger>
        Payment
        <AccordionIndicator />
      </AccordionTrigger>
    </AccordionHeading>
    <AccordionPanel>
      <AccordionBody>Payment details</AccordionBody>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem id="shipping">
    <AccordionHeading>
      <AccordionTrigger>
        Shipping
        <AccordionIndicator />
      </AccordionTrigger>
    </AccordionHeading>
    <AccordionPanel>
      <AccordionBody>Shipping details</AccordionBody>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
