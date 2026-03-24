<script lang="ts">
  let {
    html = "",
    tone = "info",
  }: {
    html?: string;
    tone?: string;
  } = $props();
</script>

<aside class={`callout callout--${tone}`}>
  <div class="callout__content">{@html html}</div>
</aside>

<style>
  .callout {
    border: 1px solid color-mix(in oklch, var(--color-border) 85%, transparent);
    border-radius: 1rem;
    padding: 1rem 1.125rem;
    background: color-mix(in oklch, var(--color-content1) 92%, white);
  }

  .callout--warning {
    border-color: color-mix(in oklch, var(--color-warning) 40%, transparent);
    background: color-mix(in oklch, var(--color-warning) 10%, white);
  }

  .callout--danger {
    border-color: color-mix(in oklch, var(--color-danger) 40%, transparent);
    background: color-mix(in oklch, var(--color-danger) 8%, white);
  }

  .callout__content :global(p:first-child) {
    margin-top: 0;
  }

  .callout__content :global(p:last-child) {
    margin-bottom: 0;
  }
</style>
