<script lang="ts">
  import type {Snippet} from "svelte";

  import {Tooltip as BitsTooltip} from "bits-ui";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<BitsTooltip.Arrow
  class={className}
  data-slot="tooltip-arrow"
  height={12}
  width={12}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <svg data-slot="overlay-arrow" height="12" viewBox="0 0 12 12" width="12">
      <path d="M0 0 Q6 9 12 0" />
    </svg>
  {/if}
</BitsTooltip.Arrow>
