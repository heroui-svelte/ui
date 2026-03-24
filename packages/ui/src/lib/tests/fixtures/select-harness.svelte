<script lang="ts">
  import {Label} from "../../components/label";
  import {ListBox, ListBoxItem, ListBoxItemIndicator} from "../../components/list-box";
  import {
    Select,
    SelectIndicator,
    SelectPopover,
    SelectTrigger,
    SelectValue,
  } from "../../components/select";

  let {
    open = true,
  }: {
    open?: boolean;
  } = $props();
</script>

<Select {open}>
  <Label>Country</Label>
  <SelectTrigger aria-label="Choose a country">
    <SelectValue placeholder="Select a country" />
    <SelectIndicator />
  </SelectTrigger>
  <SelectPopover>
    <ListBox>
      <ListBoxItem textValue="United States" value="usa">
        United States
        <ListBoxItemIndicator />
      </ListBoxItem>
      <ListBoxItem textValue="Canada" value="canada">
        Canada
        <ListBoxItemIndicator />
      </ListBoxItem>
      <ListBoxItem textValue="Japan" value="japan">
        Japan
        <ListBoxItemIndicator />
      </ListBoxItem>
    </ListBox>
  </SelectPopover>
</Select>
