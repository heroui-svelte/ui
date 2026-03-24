<script lang="ts">
  import {
    DatePicker,
    DatePickerPopover,
    DatePickerTrigger,
    DatePickerTriggerIndicator,
  } from "../../components/date-picker";

  let {
    open = true,
  }: {
    open?: boolean;
  } = $props();
</script>

<DatePicker isRequired={true} {open}>
  <DatePickerTrigger aria-label="Choose a date" />
  <DatePickerPopover />
</DatePicker>
