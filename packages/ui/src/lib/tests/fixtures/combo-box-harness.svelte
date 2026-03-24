<script lang="ts">
  import {ComboBox, ComboBoxInputGroup, ComboBoxPopover, ComboBoxTrigger} from "../../components/combo-box";
  import {Input} from "../../components/input";
  import {Label} from "../../components/label";
  import {ListBox, ListBoxItem, ListBoxItemIndicator} from "../../components/list-box";

  let {
    open = true,
  }: {
    open?: boolean;
  } = $props();
</script>

<ComboBox {open}>
  <Label>Country</Label>
  <ComboBoxInputGroup>
    <Input aria-label="Search countries" placeholder="Search countries..." />
    <ComboBoxTrigger aria-label="Toggle countries" />
  </ComboBoxInputGroup>
  <ComboBoxPopover>
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
  </ComboBoxPopover>
</ComboBox>
