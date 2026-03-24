<script lang="ts">
  import type {Snippet} from "svelte";

  import {DatePicker as BitsDatePicker} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {datePickerVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setDatePickerContext} from "./context";

  let {
    children,
    class: className = "",
    calendarLabel = "Date picker",
    closeOnDateSelect,
    disableDaysOutsideMonth,
    errorMessageId,
    fixedWeeks,
    granularity,
    hideTimeZone,
    hourCycle,
    initialFocus,
    isDateDisabled,
    isDateUnavailable,
    isDisabled,
    isReadOnly,
    isRequired,
    locale,
    maxValue,
    minValue,
    numberOfMonths,
    onInvalid,
    onOpenChange,
    onPlaceholderChange,
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
    closeOnDateSelect?: boolean;
    disableDaysOutsideMonth?: boolean;
    errorMessageId?: string;
    fixedWeeks?: boolean;
    granularity?: string;
    hideTimeZone?: boolean;
    hourCycle?: 12 | 24;
    initialFocus?: boolean;
    isDateDisabled?: (...args: any[]) => boolean;
    isDateUnavailable?: (...args: any[]) => boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    locale?: string;
    maxValue?: unknown;
    minValue?: unknown;
    numberOfMonths?: number;
    onInvalid?: (...args: any[]) => void;
    onOpenChange?: (open: boolean) => void;
    onPlaceholderChange?: (value: unknown) => void;
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

  const slots = $derived.by(() => normalizeVariantResult(datePickerVariants({}), "date-picker"));
  const rootClass = $derived(slots.base?.({}) ?? "date-picker");
  const effectiveDisabled = $derived(Boolean(isDisabled));
  const effectiveReadOnly = $derived(Boolean(isReadOnly));
  const effectiveRequired = $derived(Boolean(required ?? isRequired));

  setDatePickerContext({
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

<BitsDatePicker.Root
  {calendarLabel}
  closeOnDateSelect={closeOnDateSelect}
  disableDaysOutsideMonth={disableDaysOutsideMonth}
  disabled={effectiveDisabled}
  errorMessageId={errorMessageId}
  fixedWeeks={fixedWeeks}
  granularity={granularity as never}
  hideTimeZone={hideTimeZone}
  hourCycle={hourCycle}
  initialFocus={initialFocus}
  isDateDisabled={isDateDisabled}
  isDateUnavailable={isDateUnavailable}
  locale={locale}
  maxValue={maxValue as never}
  minValue={minValue as never}
  numberOfMonths={numberOfMonths}
  onInvalid={onInvalid}
  onOpenChange={onOpenChange}
  onPlaceholderChange={onPlaceholderChange}
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
>
  <div
    class={cn(rootClass, className)}
    data-disabled={withDataState(effectiveDisabled)}
    data-open={withDataState(open)}
    data-readonly={withDataState(effectiveReadOnly)}
    data-required={withDataState(effectiveRequired)}
    data-slot="date-picker"
    {...restProps}
  >
    {@render children?.()}
  </div>
</BitsDatePicker.Root>
