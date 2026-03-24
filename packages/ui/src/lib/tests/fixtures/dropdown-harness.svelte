<script lang="ts">
  import {
    Dropdown,
    DropdownItem,
    DropdownItemIndicator,
    DropdownMenu,
    DropdownPopover,
    DropdownTrigger,
  } from "../../components/dropdown";
  import {Label} from "../../components/label";

  let {
    open = true,
  }: {
    open?: boolean;
  } = $props();
</script>

<Dropdown {open}>
  <DropdownTrigger aria-label="Open menu">Options</DropdownTrigger>
  <DropdownPopover>
    <DropdownMenu selectionMode="multiple">
      <DropdownItem textValue="Apple" value="apple">
        <DropdownItemIndicator />
        <Label>Apple</Label>
      </DropdownItem>
      <DropdownItem textValue="Banana" value="banana">
        <DropdownItemIndicator />
        <Label>Banana</Label>
      </DropdownItem>
      <DropdownItem textValue="Cherry" value="cherry">
        <DropdownItemIndicator />
        <Label>Cherry</Label>
      </DropdownItem>
    </DropdownMenu>
  </DropdownPopover>
</Dropdown>
