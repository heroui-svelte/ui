<script lang="ts">
  import {
    Popover,
    PopoverContent,
    PopoverDialog,
    PopoverHeading,
    PopoverTrigger,
  } from "../../components/popover";
</script>

<Popover>
  <PopoverTrigger>Open popover</PopoverTrigger>
  <PopoverContent placement="bottom end">
    <PopoverDialog>
      <PopoverHeading>Popover title</PopoverHeading>
      <p>Popover content</p>
    </PopoverDialog>
  </PopoverContent>
</Popover>
