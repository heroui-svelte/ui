<script lang="ts">
  import type {Snippet} from "svelte";

  import {Popover as BitsPopover} from "bits-ui";

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

<BitsPopover.Arrow
  class={className}
  data-slot="popover-overlay-arrow-group"
  height={12}
  width={12}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <svg data-slot="popover-overlay-arrow" height="12" viewBox="0 0 12 12" width="12">
      <path d="M0 0 Q6 9 12 0" />
    </svg>
  {/if}
</BitsPopover.Arrow>
