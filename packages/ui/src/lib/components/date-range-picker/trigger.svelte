<script lang="ts">
  import type {Snippet} from "svelte";

  import {DateRangePicker as BitsDateRangePicker} from "bits-ui";

  import {dateInputGroupVariants} from "@heroui-svelte/styles";
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getDateRangePickerContext} from "./context";
  import DateRangePickerRangeSeparator from "./range-separator.svelte";
  import DateRangePickerTriggerIndicator from "./trigger-indicator.svelte";

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
  const triggerClass = $derived(context?.slots?.trigger?.({}) ?? "date-range-picker__trigger");
  const inputGroupSlots = $derived.by(
    () =>
      normalizeVariantResult(
        dateInputGroupVariants({
          fullWidth: true,
          variant: "primary",
        }),
        "date-input-group",
      ),
  );
  const groupClass = $derived(inputGroupSlots.base?.({}) ?? "date-input-group");
  const inputClass = $derived(inputGroupSlots.input?.({}) ?? "date-input-group__input");
  const inputContainerClass = $derived(
    inputGroupSlots.inputContainer?.({}) ?? "date-input-group__input-container",
  );
  const segmentClass = $derived(inputGroupSlots.segment?.({}) ?? "date-input-group__segment");
  const suffixClass = $derived(inputGroupSlots.suffix?.({}) ?? "date-input-group__suffix");
  const effectiveDisabled = $derived(Boolean(context?.isDisabled));
  const effectiveReadOnly = $derived(Boolean(context?.isReadOnly));
  const effectiveRequired = $derived(Boolean(context?.isRequired));
</script>

{#snippet renderStartSegments({segments})}
  {#each segments as segment, index (`start-${segment.part}-${segment.value}-${index}`)}
    <BitsDateRangePicker.Segment
      class={segmentClass}
      data-slot="date-input-group-segment"
      part={segment.part}
    >
      {segment.value}
    </BitsDateRangePicker.Segment>
  {/each}
{/snippet}

{#snippet renderEndSegments({segments})}
  {#each segments as segment, index (`end-${segment.part}-${segment.value}-${index}`)}
    <BitsDateRangePicker.Segment
      class={segmentClass}
      data-slot="date-input-group-segment"
      part={segment.part}
    >
      {segment.value}
    </BitsDateRangePicker.Segment>
  {/each}
{/snippet}

{#snippet renderTriggerButton({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, triggerClass, className)}
    data-slot="date-range-picker-trigger"
  >
    {#if children}
      {@render children?.()}
    {:else}
      <DateRangePickerTriggerIndicator />
    {/if}
  </button>
{/snippet}

<div
  aria-disabled={effectiveDisabled ? "true" : undefined}
  class={groupClass}
  data-disabled={withDataState(effectiveDisabled)}
  data-readonly={withDataState(effectiveReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-slot="date-input-group"
>
  <div class={inputContainerClass} data-slot="date-input-group-input-container">
    <BitsDateRangePicker.Input
      children={renderStartSegments}
      class={inputClass}
      data-slot="date-input-group-input"
      slot="start"
      type="start"
    />
    <DateRangePickerRangeSeparator />
    <BitsDateRangePicker.Input
      children={renderEndSegments}
      class={inputClass}
      data-slot="date-input-group-input"
      slot="end"
      type="end"
    />
  </div>

  <div class={suffixClass} data-slot="date-input-group-suffix">
    <BitsDateRangePicker.Trigger child={renderTriggerButton} />
  </div>
</div>
