<script lang="ts">
  import type {DocsNavSection} from "$lib/docs/types";

  import {page} from "$app/state";

  let {
    children,
    data,
  }: {
    children?: import("svelte").Snippet;
    data: {
      navSections: DocsNavSection[];
    };
  } = $props();
</script>

<div class="docs-shell">
  <aside class="docs-shell__sidebar">
    <a class="docs-shell__brand" href="/docs">
      <span class="docs-shell__brand-mark">heroui-svelte</span>
      <strong>Svelte docs</strong>
    </a>

    <nav class="docs-shell__nav" aria-label="Documentation">
      {#each data.navSections as section (section.href)}
        <section class="docs-shell__nav-section">
          <a
            class={`docs-shell__section-link ${page.url.pathname === section.href ? "is-active" : ""}`}
            href={section.href}
          >
            {section.title}
          </a>
          {#each section.groups as group (`${section.href}-${group.title}`)}
            <div class="docs-shell__group">
              <p>{group.title}</p>
              {#each group.items as item (item.href)}
                <a
                  class={`docs-shell__item-link ${page.url.pathname === item.href ? "is-active" : ""}`}
                  href={item.href}
                >
                  {item.title}
                </a>
              {/each}
            </div>
          {/each}
        </section>
      {/each}
    </nav>
  </aside>

  <main class="docs-shell__content">
    {@render children?.()}
  </main>
</div>

<style>
  .docs-shell {
    display: grid;
    min-height: 100vh;
    grid-template-columns: minmax(18rem, 22rem) minmax(0, 1fr);
    background:
      radial-gradient(circle at top left, color-mix(in oklch, var(--color-primary) 14%, transparent), transparent 28rem),
      linear-gradient(180deg, color-mix(in oklch, var(--color-content1) 96%, white), var(--color-background));
    color: var(--color-foreground);
  }

  .docs-shell__sidebar {
    position: sticky;
    top: 0;
    align-self: start;
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid color-mix(in oklch, var(--color-border) 82%, transparent);
    padding: 1.5rem 1rem 2rem;
    background: color-mix(in oklch, var(--color-content1) 88%, white);
    backdrop-filter: blur(16px);
  }

  .docs-shell__brand {
    display: grid;
    gap: 0.25rem;
    margin-bottom: 1.5rem;
    text-decoration: none;
    color: inherit;
  }

  .docs-shell__brand-mark {
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-primary);
  }

  .docs-shell__nav {
    display: grid;
    gap: 1.5rem;
  }

  .docs-shell__nav-section {
    display: grid;
    gap: 0.75rem;
  }

  .docs-shell__group {
    display: grid;
    gap: 0.25rem;
  }

  .docs-shell__group p {
    margin: 0.35rem 0 0.2rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-default-500);
  }

  .docs-shell__section-link,
  .docs-shell__item-link {
    display: block;
    border-radius: 0.8rem;
    padding: 0.5rem 0.7rem;
    text-decoration: none;
    color: inherit;
  }

  .docs-shell__section-link {
    font-weight: 700;
  }

  .docs-shell__item-link {
    color: var(--color-default-700);
  }

  .is-active {
    background: color-mix(in oklch, var(--color-primary) 14%, white);
    color: var(--color-primary-700);
  }

  .docs-shell__content {
    margin: 0 auto;
    width: min(100%, 74rem);
    padding: 2rem 1.5rem 5rem;
  }

  @media (max-width: 960px) {
    .docs-shell {
      grid-template-columns: 1fr;
    }

    .docs-shell__sidebar {
      position: static;
      height: auto;
      border-right: 0;
      border-bottom: 1px solid color-mix(in oklch, var(--color-border) 82%, transparent);
    }
  }
</style>
