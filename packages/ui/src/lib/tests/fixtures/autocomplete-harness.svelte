<script lang="ts">
  import {Label} from "../../components/label";
  import {ListBox, ListBoxItem, ListBoxItemIndicator} from "../../components/list-box";
  import {
    Autocomplete,
    AutocompleteClearButton,
    AutocompleteIndicator,
    AutocompletePopover,
    AutocompleteTrigger,
    AutocompleteValue,
  } from "../../components/autocomplete";

  let {
    open = true,
  }: {
    open?: boolean;
  } = $props();
</script>

<Autocomplete {open}>
  <Label>Country</Label>
  <AutocompleteTrigger aria-label="Choose a country">
    <AutocompleteValue placeholder="Select a country" />
    <AutocompleteClearButton />
    <AutocompleteIndicator />
  </AutocompleteTrigger>
  <AutocompletePopover>
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
  </AutocompletePopover>
</Autocomplete>
