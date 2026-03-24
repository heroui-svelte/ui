<script lang="ts">
  import type {DocsNavSection} from "$lib/docs/types";

  import {Badge, Button, Card} from "@heroui-svelte/ui";

  let {
    data,
  }: {
    data: {
      navSections: DocsNavSection[];
    };
  } = $props();
</script>

<section class="hero">
  <Badge color="accent" variant="soft">Full docs migration</Badge>
  <h1>HeroUI’s docs corpus is now served from SvelteKit.</h1>
  <p>
    The active documentation app reads the preserved legacy content tree, rewrites package and route
    references for `heroui-svelte`, and exposes the full docs IA from the Svelte workspace.
  </p>
</section>

<section class="sections">
  {#each data.navSections as section (section.href)}
    <Card variant="secondary">
      <a class="sections__card" href={section.href}>
        <strong>{section.title}</strong>
        <span>{section.groups.reduce((count, group) => count + group.items.length, 0)} pages</span>
        <Button variant="secondary">Open {section.title}</Button>
      </a>
    </Card>
  {/each}
</section>

<style>
  .hero {
    display: grid;
    gap: 1rem;
    max-width: 52rem;
    padding: 1rem 0 2rem;
  }

  .hero h1,
  .hero p {
    margin: 0;
  }

  .hero h1 {
    font-size: clamp(2.5rem, 4vw, 4.5rem);
    line-height: 0.95;
  }

  .hero p {
    font-size: 1.05rem;
    color: var(--color-default-600);
  }

  .sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1rem;
  }

  .sections__card {
    display: grid;
    gap: 0.75rem;
    text-decoration: none;
    color: inherit;
  }

  .sections__card span {
    color: var(--color-default-600);
  }
</style>
