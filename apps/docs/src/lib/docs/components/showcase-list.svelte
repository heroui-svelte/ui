<script lang="ts">
  let {
    items = [],
    title,
  }: {
    items?: string[];
    title: string;
  } = $props();
</script>

{#if items.length}
  <section class="showcases">
    <h3>{title}</h3>
    <ul>
      {#each items as item (item)}
        <li>{item}</li>
      {/each}
    </ul>
  </section>
{/if}

<style>
  .showcases {
    display: grid;
    gap: 0.75rem;
    border: 1px solid color-mix(in oklch, var(--color-border) 82%, transparent);
    border-radius: 1.25rem;
    padding: 1rem;
    background: color-mix(in oklch, var(--color-content1) 95%, white);
  }

  .showcases h3,
  .showcases ul {
    margin: 0;
  }

  .showcases ul {
    display: grid;
    gap: 0.45rem;
    padding-left: 1rem;
  }
</style>
