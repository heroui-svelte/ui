<script lang="ts">
  import type {Snippet} from "svelte";

  import {DateRangePicker as BitsDateRangePicker} from "bits-ui";

  import {rangeCalendarVariants} from "@heroui-svelte/styles";
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult} from "../../internal/slots";
  import {getDateRangePickerContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDateRangePickerContext);
  const slotClass = $derived(context?.slots?.popover?.({}) ?? "date-range-picker__popover");
  const calendarSlots = $derived.by(
    () => normalizeVariantResult(rangeCalendarVariants({}), "range-calendar"),
  );
  const calendarClass = $derived(calendarSlots.base?.({}) ?? "range-calendar");
  const headerClass = $derived(calendarSlots.header?.({}) ?? "range-calendar__header");
  const headingClass = $derived(calendarSlots.heading?.({}) ?? "range-calendar__heading");
  const navButtonClass = $derived(
    calendarSlots.navButton?.({}) ?? "range-calendar__nav-button",
  );
  const navButtonIconClass = $derived(
    calendarSlots.navButtonIcon?.({}) ?? "range-calendar__nav-button-icon",
  );
  const gridClass = $derived(calendarSlots.grid?.({}) ?? "range-calendar__grid");
  const gridHeadClass = $derived(
    calendarSlots.gridHeader?.({}) ?? "range-calendar__grid-header",
  );
  const gridBodyClass = $derived(calendarSlots.gridBody?.({}) ?? "range-calendar__grid-body");
  const gridRowClass = $derived(calendarSlots.gridRow?.({}) ?? "range-calendar__grid-row");
  const headerCellClass = $derived(
    calendarSlots.headerCell?.({}) ?? "range-calendar__header-cell",
  );
  const cellClass = $derived(calendarSlots.cell?.({}) ?? "range-calendar__cell");
  const dayClass = $derived(
    calendarSlots.day?.({}) ?? "range-calendar__cell-button",
  );
</script>

{#snippet renderCalendar({months, weekdays})}
  <BitsDateRangePicker.Header class={headerClass}>
    <BitsDateRangePicker.PrevButton class={navButtonClass}>
      <svg
        aria-hidden="true"
        class={navButtonIconClass}
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M12.5 5 7.5 10l5 5"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </svg>
    </BitsDateRangePicker.PrevButton>
    <BitsDateRangePicker.Heading class={headingClass} />
    <BitsDateRangePicker.NextButton class={navButtonClass}>
      <svg
        aria-hidden="true"
        class={navButtonIconClass}
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="m7.5 5 5 5-5 5"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </svg>
    </BitsDateRangePicker.NextButton>
  </BitsDateRangePicker.Header>

  <div class="flex gap-3">
    {#each months as month, monthIndex (`${month.value}-${monthIndex}`)}
      <BitsDateRangePicker.Grid class={gridClass}>
        <BitsDateRangePicker.GridHead class={gridHeadClass}>
          <BitsDateRangePicker.GridRow class={gridRowClass}>
            {#each weekdays as weekday, weekdayIndex (`${weekday}-${weekdayIndex}`)}
              <BitsDateRangePicker.HeadCell class={headerCellClass}>
                {weekday}
              </BitsDateRangePicker.HeadCell>
            {/each}
          </BitsDateRangePicker.GridRow>
        </BitsDateRangePicker.GridHead>

        <BitsDateRangePicker.GridBody class={gridBodyClass}>
          {#each month.weeks as week, weekIndex (weekIndex)}
            <BitsDateRangePicker.GridRow class={gridRowClass}>
              {#each week as date, dateIndex (`${date}-${dateIndex}`)}
                <BitsDateRangePicker.Cell class={cellClass} date={date} month={month.value}>
                  <BitsDateRangePicker.Day class={dayClass} />
                </BitsDateRangePicker.Cell>
              {/each}
            </BitsDateRangePicker.GridRow>
          {/each}
        </BitsDateRangePicker.GridBody>
      </BitsDateRangePicker.Grid>
    {/each}
  </div>
{/snippet}

<BitsDateRangePicker.Content
  class={cn(slotClass, className)}
  data-slot="date-range-picker-popover"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <BitsDateRangePicker.Calendar class={calendarClass} children={renderCalendar} />
  {/if}
</BitsDateRangePicker.Content>
