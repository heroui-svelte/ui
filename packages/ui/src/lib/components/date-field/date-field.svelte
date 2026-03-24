<script lang="ts">
  import type {Snippet} from "svelte";

  import {DateField as BitsDateField} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {dateFieldVariants, dateInputGroupVariants} from "@heroui-svelte/styles";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";

  let {
    children,
    class: className = "",
    errorMessageId,
    fullWidth = false,
    granularity,
    hideTimeZone,
    hourCycle,
    isDisabled,
    isReadOnly,
    isRequired,
    locale,
    maxValue,
    minValue,
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
    isReadOnly?: boolean;
    isRequired?: boolean;
    locale?: string;
    maxValue?: unknown;
    minValue?: unknown;
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

  const rootClass = $derived(dateFieldVariants({fullWidth}));
  const inputGroupSlots = $derived.by(
    () =>
      normalizeVariantResult(
        dateInputGroupVariants({
          fullWidth,
          variant: "primary",
        }),
        "date-input-group",
      ),
  );
  const groupClass = $derived(inputGroupSlots.base?.({}) ?? "date-input-group");
  const inputClass = $derived(inputGroupSlots.input?.({}) ?? "date-input-group__input");
  const segmentClass = $derived(inputGroupSlots.segment?.({}) ?? "date-input-group__segment");
  const effectiveDisabled = $derived(Boolean(isDisabled));
  const effectiveReadOnly = $derived(Boolean(isReadOnly));
  const effectiveRequired = $derived(Boolean(required ?? isRequired));
</script>

{#snippet renderSegments({segments})}
  {#each segments as segment, index (`${segment.part}-${segment.value}-${index}`)}
    <BitsDateField.Segment
      class={segmentClass}
      data-slot="date-input-group-segment"
      part={segment.part}
    >
      {segment.value}
    </BitsDateField.Segment>
  {/each}
{/snippet}

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
  onValueChange={onValueChange}
  placeholder={placeholder as never}
  readonly={effectiveReadOnly}
  readonlySegments={readonlySegments as never}
  required={effectiveRequired}
  validate={validate as never}
  value={value as never}
>
  <div
    class={cn(rootClass, className)}
    data-disabled={withDataState(effectiveDisabled)}
    data-readonly={withDataState(effectiveReadOnly)}
    data-required={withDataState(effectiveRequired)}
    data-slot="date-field"
    {...restProps}
  >
    {#if children}
      {@render children?.()}
    {:else}
      <div
        aria-disabled={effectiveDisabled ? "true" : undefined}
        class={groupClass}
        data-disabled={withDataState(effectiveDisabled)}
        data-readonly={withDataState(effectiveReadOnly)}
        data-required={withDataState(effectiveRequired)}
        data-slot="date-input-group"
      >
        <BitsDateField.Input
          class={inputClass}
          data-slot="date-input-group-input"
          children={renderSegments}
        />
      </div>
    {/if}
  </div>
</BitsDateField.Root>
