<script lang="ts">
  let {
    tabs = [],
  }: {
    tabs?: Array<{
      code: string;
      label: string;
      language: string;
    }>;
  } = $props();

  let activeIndex = $state(0);
  const activeTab = $derived(tabs[activeIndex] ?? tabs[0]);
</script>

{#if tabs.length}
  <section class="docs-tabs">
    <div class="docs-tabs__controls" role="tablist" aria-label="Documentation examples">
      {#each tabs as tab, index (tab.label)}
        <button
          class={`docs-tabs__control ${index === activeIndex ? "docs-tabs__control--active" : ""}`}
          onclick={() => (activeIndex = index)}
          role="tab"
          type="button"
        >
          {tab.label}
        </button>
      {/each}
    </div>
    {#if activeTab}
      <pre class="docs-tabs__code"><code>{activeTab.code}</code></pre>
    {/if}
  </section>
{/if}

<style>
  .docs-tabs {
    display: grid;
    gap: 0.75rem;
    border: 1px solid color-mix(in oklch, var(--color-border) 82%, transparent);
    border-radius: 1.25rem;
    padding: 0.85rem;
    background: color-mix(in oklch, var(--color-content1) 95%, white);
  }

  .docs-tabs__controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .docs-tabs__control {
    border: 0;
    border-radius: 999px;
    padding: 0.5rem 0.85rem;
    background: color-mix(in oklch, var(--color-default) 8%, white);
    color: var(--color-default-700);
    font: inherit;
    cursor: pointer;
  }

  .docs-tabs__control--active {
    background: var(--color-primary);
    color: var(--color-primary-foreground);
  }

  .docs-tabs__code {
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
