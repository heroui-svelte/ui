<script lang="ts">
  import type {Snippet} from "svelte";

  import {DateField as BitsDateField} from "bits-ui";

  import {timeFieldVariants} from "@heroui-svelte/styles";
  import {cn} from "../../internal/cn";
  import {withDataState} from "../../internal/slots";
  import {setTimeFieldContext} from "./context";
  import TimeFieldGroup from "./group.svelte";

  let {
    children,
    class: className = "",
    errorMessageId,
    fullWidth = false,
    granularity = "minute",
    hideTimeZone,
    hourCycle,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    locale,
    maxValue,
    minValue,
    name = "",
    onChange,
    onInvalid,
    onPlaceholderChange,
    onValueChange,
    placeholder,
    readonlySegments,
    required,
    validate,
    value,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    errorMessageId?: string;
    fullWidth?: boolean;
    granularity?: string;
    hideTimeZone?: boolean;
    hourCycle?: 12 | 24;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    locale?: string;
    maxValue?: unknown;
    minValue?: unknown;
    name?: string;
    onChange?: (value: unknown) => void;
    onInvalid?: (...args: any[]) => void;
    onPlaceholderChange?: (value: unknown) => void;
    onValueChange?: (value: unknown) => void;
    placeholder?: unknown;
    readonlySegments?: string[];
    required?: boolean;
    validate?: (...args: any[]) => any;
    value?: unknown;
    [key: string]: any;
  } = $props();

  const rootClass = $derived(timeFieldVariants({fullWidth}));
  const effectiveDisabled = $derived(Boolean(isDisabled));
  const effectiveInvalid = $derived(Boolean(isInvalid));
  const effectiveReadOnly = $derived(Boolean(isReadOnly));
  const effectiveRequired = $derived(Boolean(required ?? isRequired));

  setTimeFieldContext({
    get fullWidth() {
      return fullWidth;
    },
    get isDisabled() {
      return effectiveDisabled;
    },
    get isInvalid() {
      return effectiveInvalid;
    },
    get isReadOnly() {
      return effectiveReadOnly;
    },
    get isRequired() {
      return effectiveRequired;
    },
    get name() {
      return name;
    },
  });
</script>

<BitsDateField.Root
  disabled={effectiveDisabled}
  errorMessageId={errorMessageId}
  granularity={granularity as never}
  hideTimeZone={hideTimeZone}
  hourCycle={hourCycle}
  locale={locale}
  maxValue={maxValue as never}
  minValue={minValue as never}
  onInvalid={onInvalid}
  onPlaceholderChange={onPlaceholderChange}
  onValueChange={(nextValue) => {
    onValueChange?.(nextValue);
    onChange?.(nextValue);
  }}
  placeholder={placeholder as never}
  readonly={effectiveReadOnly}
  readonlySegments={readonlySegments as never}
  required={effectiveRequired}
  validate={validate as never}
  value={value as never}
>
  <div
    aria-invalid={effectiveInvalid ? "true" : undefined}
    class={cn(rootClass, className)}
    data-disabled={withDataState(effectiveDisabled)}
    data-invalid={withDataState(effectiveInvalid)}
    data-readonly={withDataState(effectiveReadOnly)}
    data-required={withDataState(effectiveRequired)}
    data-slot="time-field"
    {...restProps}
  >
    {#if children}
      {@render children?.()}
    {:else}
      <TimeFieldGroup />
    {/if}
  </div>
</BitsDateField.Root>
