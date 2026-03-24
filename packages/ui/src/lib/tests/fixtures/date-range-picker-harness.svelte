<script lang="ts">
  import {
    DateRangePicker,
    DateRangePickerPopover,
    DateRangePickerTrigger,
  } from "../../components/date-range-picker";

  let {
    open = true,
  }: {
    open?: boolean;
  } = $props();
</script>

<DateRangePicker {open}>
  <DateRangePickerTrigger aria-label="Choose a date range" />
  <DateRangePickerPopover />
</DateRangePicker>
