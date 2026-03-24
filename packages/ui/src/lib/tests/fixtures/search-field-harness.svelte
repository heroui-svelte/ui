<script lang="ts">
  import {Description} from "../../components/description";
  import {Label} from "../../components/label";
  import {
    SearchField,
    SearchFieldClearButton,
    SearchFieldGroup,
    SearchFieldInput,
    SearchFieldSearchIcon,
  } from "../../components/search-field";

  let {
    onChange,
    onInput,
    onValueChange,
  }: {
    onChange?: (value: string) => void;
    onInput?: (value: string) => void;
    onValueChange?: (value: string) => void;
  } = $props();

  const handleInput = (event: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
    onInput?.(event.currentTarget.value);
  };
</script>

<SearchField
  defaultValue="hero"
  fullWidth={true}
  isRequired={true}
  name="search"
  onChange={onChange}
  onValueChange={onValueChange}
  variant="secondary"
>
  <Label>Search docs</Label>
  <Description>Search through the documentation.</Description>
  <SearchFieldGroup>
    <SearchFieldSearchIcon />
    <SearchFieldInput oninput={handleInput} />
    <SearchFieldClearButton aria-label="Clear search" />
  </SearchFieldGroup>
</SearchField>
