<script lang="ts">
  import type {DocsNavItem} from "$lib/docs/types";

  let {
    items = [],
    title,
  }: {
    items?: DocsNavItem[];
    title: string;
  } = $props();
</script>

{#if items.length}
  <section class="related">
    <h3>{title}</h3>
    <div class="related__grid">
      {#each items as item (item.href)}
        <a class="related__card" href={item.href}>
          <strong>{item.title}</strong>
          {#if item.description}
            <p>{item.description}</p>
          {/if}
        </a>
      {/each}
    </div>
  </section>
{/if}

<style>
  .related {
    display: grid;
    gap: 0.75rem;
  }

  .related h3,
  .related p {
    margin: 0;
  }

  .related__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 0.75rem;
  }

  .related__card {
    display: grid;
    gap: 0.35rem;
    border: 1px solid color-mix(in oklch, var(--color-border) 82%, transparent);
    border-radius: 1rem;
    padding: 0.9rem;
    text-decoration: none;
    color: inherit;
    background: color-mix(in oklch, var(--color-content1) 95%, white);
  }

  .related__card p {
    color: var(--color-default-600);
  }
</style>
