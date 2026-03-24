<script lang="ts">
  let {class: className = "", height = 16, width = 16, ...restProps}: any = $props();
</script>

<svg
  aria-hidden="true"
  aria-label="Close icon"
  class={className}
  fill="none"
  height={height}
  role="presentation"
  viewBox="0 0 16 16"
  width={width}
  xmlns="http://www.w3.org/2000/svg"
  {...restProps}
>
  <path
    clip-rule="evenodd"
    d="M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8 3.47 4.53a.75.75 0 0 1 0-1.06Z"
    fill="currentColor"
    fill-rule="evenodd"
  />
</svg>
