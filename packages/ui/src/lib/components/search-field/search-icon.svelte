<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getSearchFieldContext} from "./context";

  let {
    children,
    class: className = "",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getSearchFieldContext);
  const slotClass = $derived(context?.slots?.searchIcon?.({}) ?? "search-field__search-icon");
</script>

<span aria-hidden="true" class={cn(slotClass, className)} data-slot="search-field-search-icon" {...restProps}>
  {#if children}
    {@render children()}
  {:else}
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      role="presentation"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.16667 2.16667C4.40524 2.16667 2.16667 4.40524 2.16667 7.16667C2.16667 9.92809 4.40524 12.1667 7.16667 12.1667C8.3464 12.1667 9.43072 11.7583 10.2851 11.0755L12.8047 13.5952C13.0651 13.8555 13.4872 13.8555 13.7475 13.5952C14.0079 13.3348 14.0079 12.9127 13.7475 12.6524L11.2279 10.1327C11.9107 9.27838 12.3191 8.19407 12.3191 7.01434C12.3191 4.25291 10.0805 2.01434 7.31908 2.01434L7.16667 2.16667ZM7.16667 3.5C9.19171 3.5 10.8333 5.14162 10.8333 7.16667C10.8333 9.19171 9.19171 10.8333 7.16667 10.8333C5.14162 10.8333 3.5 9.19171 3.5 7.16667C3.5 5.14162 5.14162 3.5 7.16667 3.5Z"
        fill="currentColor"
      />
    </svg>
  {/if}
</span>
