<script lang="ts">
  import type {Snippet} from "svelte";

  import {DateRangePicker as BitsDateRangePicker} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {dateRangePickerVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setDateRangePickerContext} from "./context";

  let {
    children,
    class: className = "",
    calendarLabel = "Date range picker",
    closeOnRangeSelect,
    disableDaysOutsideMonth,
    errorMessageId,
    fixedWeeks,
    granularity,
    hideTimeZone,
    hourCycle,
    isDateDisabled,
    isDateUnavailable,
    isDisabled,
    isReadOnly,
    isRequired,
    locale,
    maxValue,
    minValue,
    numberOfMonths,
    onEndValueChange,
    onInvalid,
    onOpenChange,
    onPlaceholderChange,
    onStartValueChange,
    onValueChange,
    open,
    pagedNavigation,
    placeholder,
    preventDeselect,
    readonlySegments,
    required,
    validate,
    value,
    weekStartsOn,
    weekdayFormat,
    ...restProps
  }: {
    children?: Snippet;
    calendarLabel?: string;
    class?: string;
    closeOnRangeSelect?: boolean;
    disableDaysOutsideMonth?: boolean;
    errorMessageId?: string;
    fixedWeeks?: boolean;
    granularity?: string;
    hideTimeZone?: boolean;
    hourCycle?: 12 | 24;
    isDateDisabled?: (...args: any[]) => boolean;
    isDateUnavailable?: (...args: any[]) => boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    locale?: string;
    maxValue?: unknown;
    minValue?: unknown;
    numberOfMonths?: number;
    onEndValueChange?: (value: unknown) => void;
    onInvalid?: (...args: any[]) => void;
    onOpenChange?: (open: boolean) => void;
    onPlaceholderChange?: (value: unknown) => void;
    onStartValueChange?: (value: unknown) => void;
    onValueChange?: (value: unknown) => void;
    open?: boolean;
    pagedNavigation?: boolean;
    placeholder?: unknown;
    preventDeselect?: boolean;
    readonlySegments?: string[];
    required?: boolean;
    validate?: (...args: any[]) => any;
    value?: unknown;
    weekStartsOn?: number;
    weekdayFormat?: Intl.DateTimeFormatOptions["weekday"];
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () => normalizeVariantResult(dateRangePickerVariants({}), "date-range-picker"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "date-range-picker");
  const effectiveDisabled = $derived(Boolean(isDisabled));
  const effectiveReadOnly = $derived(Boolean(isReadOnly));
  const effectiveRequired = $derived(Boolean(required ?? isRequired));

  setDateRangePickerContext({
    get isDisabled() {
      return effectiveDisabled;
    },
    get isReadOnly() {
      return effectiveReadOnly;
    },
    get isRequired() {
      return effectiveRequired;
    },
    get slots() {
      return slots;
    },
  });
</script>

{#snippet rootChild({props})}
  <div
    {...props}
    {...restProps}
    class={cn(props.class, rootClass, className)}
    data-disabled={withDataState(effectiveDisabled)}
    data-open={withDataState(open)}
    data-readonly={withDataState(effectiveReadOnly)}
    data-required={withDataState(effectiveRequired)}
    data-slot="date-range-picker"
  >
    {@render children?.()}
  </div>
{/snippet}

<BitsDateRangePicker.Root
  {calendarLabel}
  child={rootChild}
  closeOnRangeSelect={closeOnRangeSelect}
  disableDaysOutsideMonth={disableDaysOutsideMonth}
  disabled={effectiveDisabled}
  errorMessageId={errorMessageId}
  fixedWeeks={fixedWeeks}
  granularity={granularity as never}
  hideTimeZone={hideTimeZone}
  hourCycle={hourCycle}
  isDateDisabled={isDateDisabled}
  isDateUnavailable={isDateUnavailable}
  locale={locale}
  maxValue={maxValue as never}
  minValue={minValue as never}
  numberOfMonths={numberOfMonths}
  onEndValueChange={onEndValueChange}
  onInvalid={onInvalid}
  onOpenChange={onOpenChange}
  onPlaceholderChange={onPlaceholderChange}
  onStartValueChange={onStartValueChange}
  onValueChange={onValueChange}
  {open}
  pagedNavigation={pagedNavigation}
  placeholder={placeholder as never}
  preventDeselect={preventDeselect}
  readonly={effectiveReadOnly}
  readonlySegments={readonlySegments as never}
  required={effectiveRequired}
  validate={validate as never}
  value={value as never}
  weekStartsOn={weekStartsOn as never}
  weekdayFormat={weekdayFormat}
/>
