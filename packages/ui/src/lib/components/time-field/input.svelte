<script lang="ts">
  import type {Snippet} from "svelte";

  import {DateField as BitsDateField} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getTimeFieldContext, getTimeFieldGroupContext} from "./context";
  import TimeFieldSegment from "./segment.svelte";

  type SegmentRecord = {
    part: string;
    value: string;
  };

  let {
    children,
    class: className = "",
    name,
    ...restProps
  }: {
    children?: Snippet<[{
      segments: SegmentRecord[];
    }]>;
    class?: string;
    name?: string;
    [key: string]: any;
  } = $props();

  const rootContext = safeGetContext(getTimeFieldContext);
  const groupContext = safeGetContext(getTimeFieldGroupContext);
  const inputClass = $derived(groupContext?.slots?.input?.({}) ?? "date-input-group__input");
  const resolvedName = $derived(name ?? rootContext?.name ?? "");
</script>

{#snippet renderDefaultSegments({segments})}
  {#each segments as segment, index (`${segment.part}-${segment.value}-${index}`)}
    <TimeFieldSegment part={segment.part} value={segment.value} />
  {/each}
{/snippet}

<BitsDateField.Input
  children={children ?? renderDefaultSegments}
  class={cn(inputClass, className)}
  data-slot="date-input-group-input"
  name={resolvedName}
  {...restProps}
/>
