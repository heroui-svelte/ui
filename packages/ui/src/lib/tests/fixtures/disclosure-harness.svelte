<script lang="ts">
  import {
    Disclosure,
    DisclosureBody,
    DisclosureContent,
    DisclosureHeading,
    DisclosureIndicator,
    DisclosureTrigger,
  } from "../../components/disclosure";
  import {DisclosureGroup as DisclosureGroupRoot} from "../../components/disclosure-group";

  let {
    onAlphaExpandedChange,
    onBetaExpandedChange,
    onBetaOpenChange,
    onExpandedChange,
    onGroupChange,
  }: {
    onAlphaExpandedChange?: (isExpanded: boolean) => void;
    onBetaExpandedChange?: (isExpanded: boolean) => void;
    onBetaOpenChange?: (isExpanded: boolean) => void;
    onExpandedChange?: (isExpanded: boolean) => void;
    onGroupChange?: (keys: Set<string>) => void;
  } = $props();
</script>

<Disclosure onExpandedChange={onExpandedChange}>
  <DisclosureHeading>
    <DisclosureTrigger>
      Single
      <DisclosureIndicator />
    </DisclosureTrigger>
  </DisclosureHeading>
  <DisclosureContent>
    <DisclosureBody class="single-body-inner">Single content</DisclosureBody>
  </DisclosureContent>
</Disclosure>

<DisclosureGroupRoot defaultExpandedKeys={["alpha"]} onExpandedChange={onGroupChange}>
  <Disclosure id="alpha" onExpandedChange={onAlphaExpandedChange}>
    <DisclosureHeading>
      <DisclosureTrigger>
        Alpha
        <DisclosureIndicator />
      </DisclosureTrigger>
    </DisclosureHeading>
    <DisclosureContent>
      <DisclosureBody>Alpha content</DisclosureBody>
    </DisclosureContent>
  </Disclosure>

  <Disclosure id="beta" onExpandedChange={onBetaExpandedChange} onOpenChange={onBetaOpenChange}>
    <DisclosureHeading>
      <DisclosureTrigger>
        Beta
        <DisclosureIndicator />
      </DisclosureTrigger>
    </DisclosureHeading>
    <DisclosureContent>
      <DisclosureBody>Beta content</DisclosureBody>
    </DisclosureContent>
  </Disclosure>
</DisclosureGroupRoot>
