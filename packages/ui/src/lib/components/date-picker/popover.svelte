<script lang="ts">
  import type {Snippet} from "svelte";

  import {DatePicker as BitsDatePicker} from "bits-ui";

  import {calendarVariants} from "@heroui-svelte/styles";
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult} from "../../internal/slots";
  import {getDatePickerContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getDatePickerContext);
  const slotClass = $derived(context?.slots?.popover?.({}) ?? "date-picker__popover");
  const calendarSlots = $derived.by(
    () => normalizeVariantResult(calendarVariants({}), "calendar"),
  );
  const calendarClass = $derived(calendarSlots.base?.({}) ?? "calendar");
  const headerClass = $derived(calendarSlots.header?.({}) ?? "calendar__header");
  const headingClass = $derived(calendarSlots.heading?.({}) ?? "calendar__heading");
  const navButtonClass = $derived(calendarSlots.navButton?.({}) ?? "calendar__nav-button");
  const navButtonIconClass = $derived(
    calendarSlots.navButtonIcon?.({}) ?? "calendar__nav-button-icon",
  );
  const gridClass = $derived(calendarSlots.grid?.({}) ?? "calendar__grid");
  const gridHeadClass = $derived(calendarSlots.gridHeader?.({}) ?? "calendar__grid-header");
  const gridBodyClass = $derived(calendarSlots.gridBody?.({}) ?? "calendar__grid-body");
  const gridRowClass = $derived(calendarSlots.gridRow?.({}) ?? "calendar__grid-row");
  const headerCellClass = $derived(calendarSlots.headerCell?.({}) ?? "calendar__header-cell");
  const cellClass = $derived(calendarSlots.cell?.({}) ?? "calendar__cell");
</script>

{#snippet renderCalendar({months, weekdays})}
  <BitsDatePicker.Header class={headerClass}>
    <BitsDatePicker.PrevButton class={navButtonClass}>
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
    </BitsDatePicker.PrevButton>
    <BitsDatePicker.Heading class={headingClass} />
    <BitsDatePicker.NextButton class={navButtonClass}>
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
    </BitsDatePicker.NextButton>
  </BitsDatePicker.Header>

  <div class="flex gap-3">
    {#each months as month, monthIndex (`${month.value}-${monthIndex}`)}
      <BitsDatePicker.Grid class={gridClass}>
        <BitsDatePicker.GridHead class={gridHeadClass}>
          <BitsDatePicker.GridRow class={gridRowClass}>
            {#each weekdays as weekday, weekdayIndex (`${weekday}-${weekdayIndex}`)}
              <BitsDatePicker.HeadCell class={headerCellClass}>{weekday}</BitsDatePicker.HeadCell>
            {/each}
          </BitsDatePicker.GridRow>
        </BitsDatePicker.GridHead>

        <BitsDatePicker.GridBody class={gridBodyClass}>
          {#each month.weeks as week, weekIndex (weekIndex)}
            <BitsDatePicker.GridRow class={gridRowClass}>
              {#each week as date, dateIndex (`${date}-${dateIndex}`)}
                <BitsDatePicker.Cell class={cellClass} date={date} month={month.value}>
                  <BitsDatePicker.Day />
                </BitsDatePicker.Cell>
              {/each}
            </BitsDatePicker.GridRow>
          {/each}
        </BitsDatePicker.GridBody>
      </BitsDatePicker.Grid>
    {/each}
  </div>
{/snippet}

<BitsDatePicker.Content
  class={cn(slotClass, className)}
  data-slot="date-picker-popover"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <BitsDatePicker.Calendar class={calendarClass} children={renderCalendar} />
  {/if}
</BitsDatePicker.Content>
