<script lang="ts">
  let {
    converted = false,
    language = "svelte",
    name,
    source = "",
    title,
  }: {
    converted?: boolean;
    language?: string;
    name: string;
    source?: string;
    title: string;
  } = $props();
</script>

<section class="preview">
  <header class="preview__header">
    <div>
      <p class="preview__eyebrow">{name}</p>
      <h3>{title}</h3>
    </div>
    <span class={`preview__badge ${converted ? "preview__badge--converted" : ""}`}>
      {converted ? "Svelte-oriented example" : "Reference source"}
    </span>
  </header>
  <pre class="preview__code"><code>{source}</code></pre>
</section>

<style>
  .preview {
    display: grid;
    gap: 0.75rem;
    border: 1px solid color-mix(in oklch, var(--color-border) 82%, transparent);
    border-radius: 1.25rem;
    padding: 1rem;
    background: color-mix(in oklch, var(--color-content1) 94%, white);
  }

  .preview__header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 1rem;
  }

  .preview__eyebrow,
  .preview h3 {
    margin: 0;
  }

  .preview__eyebrow {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-default-600);
  }

  .preview__badge {
    border-radius: 999px;
    padding: 0.3rem 0.65rem;
    font-size: 0.75rem;
    font-weight: 600;
    background: color-mix(in oklch, var(--color-default) 12%, white);
    color: var(--color-default-700);
  }

  .preview__badge--converted {
    background: color-mix(in oklch, var(--color-success) 18%, white);
    color: var(--color-success-700);
  }

  .preview__code {
    margin: 0;
    overflow-x: auto;
    border-radius: 1rem;
    padding: 1rem;
    background: color-mix(in oklch, var(--color-content2) 88%, black);
    color: white;
    font-size: 0.875rem;
    line-height: 1.6;
  }
</style>
