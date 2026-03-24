<script lang="ts">
  import type {Snippet} from "svelte";

  import {DateField as BitsDateField} from "bits-ui";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getTimeFieldGroupContext} from "./context";

  let {
    children,
    class: className = "",
    part,
    value = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    part: string;
    value?: string;
    [key: string]: any;
  } = $props();

  const groupContext = safeGetContext(getTimeFieldGroupContext);
  const segmentClass = $derived(groupContext?.slots?.segment?.({}) ?? "date-input-group__segment");
</script>

<BitsDateField.Segment
  class={cn(segmentClass, className)}
  data-slot="date-input-group-segment"
  part={part as never}
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    {value}
  {/if}
</BitsDateField.Segment>
