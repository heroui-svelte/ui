<script lang="ts">
  import Callout from "$lib/docs/components/callout.svelte";
  import ComponentPreview from "$lib/docs/components/component-preview.svelte";
  import DocsTabs from "$lib/docs/components/docs-tabs.svelte";
  import RelatedLinks from "$lib/docs/components/related-links.svelte";
  import ShowcaseList from "$lib/docs/components/showcase-list.svelte";
  import type {DocsPage} from "$lib/docs/types";

  let {
    data,
  }: {
    data: {
      doc: DocsPage;
    };
  } = $props();
</script>

<article class="doc-page">
  <header class="doc-page__header">
    <p class="doc-page__eyebrow">{data.doc.section.replace(/-/g, " ")}</p>
    <h1>{data.doc.title}</h1>
    {#if data.doc.description}
      <p class="doc-page__description">{data.doc.description}</p>
    {/if}
  </header>

  <div class="doc-page__content">
    {#each data.doc.blocks as block, index (`${block.type}-${index}`)}
      {#if block.type === "markdown"}
        <div class="prose">{@html block.html}</div>
      {:else if block.type === "callout"}
        <Callout html={block.html} tone={block.tone} />
      {:else if block.type === "preview"}
        <ComponentPreview
          converted={block.converted}
          language={block.language}
          name={block.name}
          source={block.source}
          title={block.title}
        />
      {:else if block.type === "tabs"}
        <DocsTabs tabs={block.tabs} />
      {:else if block.type === "related"}
        <RelatedLinks items={block.items} title={block.title} />
      {:else if block.type === "showcases"}
        <ShowcaseList items={block.items} title={block.title} />
      {/if}
    {/each}
  </div>
</article>

<style>
  .doc-page {
    display: grid;
    gap: 2rem;
  }

  .doc-page__header {
    display: grid;
    gap: 0.75rem;
    max-width: 52rem;
  }

  .doc-page__eyebrow,
  .doc-page__header h1,
  .doc-page__description {
    margin: 0;
  }

  .doc-page__eyebrow {
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-primary);
  }

  .doc-page__header h1 {
    font-size: clamp(2rem, 3vw, 3.4rem);
    line-height: 0.95;
  }

  .doc-page__description {
    font-size: 1.05rem;
    color: var(--color-default-600);
  }

  .doc-page__content {
    display: grid;
    gap: 1.5rem;
  }

  .prose :global(h2),
  .prose :global(h3),
  .prose :global(h4) {
    margin: 1.5rem 0 0.75rem;
  }

  .prose :global(p),
  .prose :global(ul),
  .prose :global(ol),
  .prose :global(pre),
  .prose :global(table) {
    margin: 0 0 1rem;
  }

  .prose :global(p),
  .prose :global(li),
  .prose :global(td),
  .prose :global(th) {
    color: var(--color-default-700);
    line-height: 1.7;
  }

  .prose :global(code) {
    border-radius: 0.45rem;
    padding: 0.12rem 0.35rem;
    background: color-mix(in oklch, var(--color-default) 10%, white);
    font-size: 0.92em;
  }

  .prose :global(pre) {
    overflow-x: auto;
    border-radius: 1rem;
    padding: 1rem;
    background: color-mix(in oklch, var(--color-content2) 88%, black);
    color: white;
  }

  .prose :global(pre code) {
    padding: 0;
    background: transparent;
  }

  .prose :global(a) {
    color: var(--color-primary-700);
  }

  .prose :global(table) {
    width: 100%;
    border-collapse: collapse;
  }

  .prose :global(th),
  .prose :global(td) {
    border-bottom: 1px solid color-mix(in oklch, var(--color-border) 82%, transparent);
    padding: 0.7rem;
    text-align: left;
  }
</style>
