<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getLinkContext} from "./context";

  let {
    children,
    class: className = "",
    isDisabled,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    isDisabled?: boolean;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getLinkContext);
  const slotClass = $derived(context?.slots?.icon?.({}) ?? "link__icon");
</script>

<span
  class={cn(slotClass, className)}
  data-default-icon={children ? undefined : "true"}
  data-disabled={withDataState(isDisabled)}
  data-slot="link-icon"
  {...restProps}
>
  {#if children}
    {@render children?.()}
  {:else}
    <svg
      aria-hidden="true"
      data-slot="link-default-icon"
      fill="none"
      role="presentation"
      viewBox="0 0 7 7"
      width="9"
      height="9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.20592 6.84333L0.379822 6.01723L4.52594 1.8672H1.37819L1.38601 0.731812H6.48742V5.83714H5.34421L5.35203 2.6933L1.20592 6.84333Z"
        fill="currentColor"
      />
    </svg>
  {/if}
</span>
