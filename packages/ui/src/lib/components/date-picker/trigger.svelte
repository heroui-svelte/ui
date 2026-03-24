<script lang="ts">
  import type {Snippet} from "svelte";

  import {DatePicker as BitsDatePicker} from "bits-ui";

  import {dateInputGroupVariants} from "@heroui-svelte/styles";
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getDatePickerContext} from "./context";
  import DatePickerTriggerIndicator from "./trigger-indicator.svelte";

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
  const triggerClass = $derived(context?.slots?.trigger?.({}) ?? "date-picker__trigger");
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
  const segmentClass = $derived(inputGroupSlots.segment?.({}) ?? "date-input-group__segment");
  const suffixClass = $derived(inputGroupSlots.suffix?.({}) ?? "date-input-group__suffix");
  const effectiveDisabled = $derived(Boolean(context?.isDisabled));
  const effectiveReadOnly = $derived(Boolean(context?.isReadOnly));
  const effectiveRequired = $derived(Boolean(context?.isRequired));
</script>

{#snippet renderSegments({segments})}
  {#each segments as segment, index (`${segment.part}-${segment.value}-${index}`)}
    <BitsDatePicker.Segment
      class={segmentClass}
      data-slot="date-input-group-segment"
      part={segment.part}
    >
      {segment.value}
    </BitsDatePicker.Segment>
  {/each}
{/snippet}

{#snippet renderTriggerButton({props})}
  <button
    {...props}
    {...restProps}
    class={cn(props.class, triggerClass, className)}
    data-slot="date-picker-trigger"
  >
    {#if children}
      {@render children?.()}
    {:else}
      <DatePickerTriggerIndicator />
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
  <BitsDatePicker.Input
    class={inputClass}
    data-slot="date-input-group-input"
    children={renderSegments}
  />
  <div class={suffixClass} data-slot="date-input-group-suffix">
    <BitsDatePicker.Trigger child={renderTriggerButton} />
  </div>
</div>
