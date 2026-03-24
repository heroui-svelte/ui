<script lang="ts">
  import {
    Tab,
    TabIndicator,
    TabList,
    TabListContainer,
    TabPanel,
    Tabs,
  } from "../../components/tabs";

  let {
    defaultSelectedKey = "overview",
    onSelectionChange,
  }: {
    defaultSelectedKey?: string;
    onSelectionChange?: (key: string) => void;
  } = $props();
</script>

<Tabs defaultSelectedKey={defaultSelectedKey} onSelectionChange={onSelectionChange}>
  <TabListContainer>
    <TabList aria-label="Project sections">
      <Tab id="overview">
        Overview
        <TabIndicator />
      </Tab>
      <Tab id="analytics">
        Analytics
        <TabIndicator />
      </Tab>
      <Tab id="reports" isDisabled={true}>
        Reports
        <TabIndicator />
      </Tab>
    </TabList>
  </TabListContainer>

  <TabPanel id="overview">Overview panel</TabPanel>
  <TabPanel id="analytics">Analytics panel</TabPanel>
  <TabPanel id="reports">Reports panel</TabPanel>
</Tabs>
