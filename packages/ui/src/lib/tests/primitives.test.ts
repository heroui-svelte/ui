import {render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import PrimitivesHarness from "./fixtures/primitives-harness.svelte";

describe("simple primitives", () => {
  it("preserves variant inheritance and slot contracts for the simpler families", () => {
    const {container} = render(PrimitivesHarness);

    const [firstButton, secondButton] = screen.getAllByRole("button");
    const input = screen.getByRole("textbox", {name: /email/i});
    const notes = screen.getByRole("textbox", {name: /notes/i});
    const link = screen.getByRole("link", {name: /docs/i});

    expect(firstButton.className).toContain("button--secondary");
    expect(firstButton.className).toContain("button--sm");
    expect(firstButton.className).toContain("button--full-width");
    expect(secondButton.className).toContain("button--secondary");

    expect(container.querySelector('[data-slot="alert"]')?.className).toContain("alert--warning");
    expect(container.querySelector('[data-slot="alert-default-icon"]')).toBeTruthy();
    expect(container.querySelector('[data-slot="alert-title"]')?.textContent).toBe("Warning");
    expect(container.querySelector('[data-slot="alert-description"]')?.textContent).toContain(
      "Check your settings",
    );

    expect(input.className).toContain("input--secondary");
    expect(input.className).toContain("input--full-width");
    expect(notes.className).toContain("textarea--secondary");

    expect(link.querySelector('[data-slot="link-default-icon"]')).toBeTruthy();
    expect(container.querySelector('[data-slot="surface"]')?.className).toContain(
      "surface--tertiary",
    );
    expect(container.querySelector('[data-slot="card"]')?.className).toContain("card--secondary");
    expect(container.querySelector('[data-slot="card-header"]')?.className).toContain(
      "card__header",
    );
    expect(container.querySelector('[data-slot="card-footer"]')?.className).toContain(
      "card__footer",
    );
    expect(container.querySelector('[data-slot="badge"]')?.className).toContain("badge--success");
    expect(container.querySelector('[data-slot="badge"]')?.className).toContain("badge--soft");
    expect(container.querySelector('[data-slot="badge-label"]')?.textContent).toBe("3");
    expect(container.querySelector('[data-slot="chip"]')?.className).toContain("chip--accent");
    expect(container.querySelector('[data-slot="chip"]')?.className).toContain("chip--primary");
    expect(container.querySelector('[data-slot="chip-label"]')?.textContent).toBe("Chip text");
    expect(container.querySelector('[data-slot="close-button-icon"]')).toBeTruthy();
    expect(container.querySelector('[data-slot="spinner"]')?.className).toContain(
      "spinner--danger",
    );
    expect(container.querySelector('[data-slot="spinner"]')?.className).toContain("spinner--lg");
    expect(container.querySelector('[data-slot="spinner-icon"]')).toBeTruthy();
    expect(container.querySelector('[data-slot="skeleton"]')?.className).toContain(
      "skeleton--pulse",
    );
    expect(container.querySelector('[data-slot="label"]')?.className).toContain("label--invalid");
    expect(container.querySelector('[data-slot="label"]')?.className).toContain("label--required");
    expect(container.querySelector('[data-slot="description"]')?.textContent).toContain(
      "Helper text",
    );
    expect(container.querySelector('[data-slot="text"]')?.className).toContain("text-lg");
    expect(container.querySelector('[data-slot="text"]')?.className).toContain("text-muted");
    expect(container.querySelector('[data-slot="field-error"]')?.textContent).toContain(
      "Field is required",
    );
    expect(container.querySelector('[data-slot="empty-state"]')?.textContent).toContain(
      "No results found",
    );
    expect(container.querySelector('[data-slot="kbd"]')?.className).toContain("kbd--light");
    expect(container.querySelector('[data-slot="kbd-abbr"]')?.textContent).toBe("⌘");
    expect(container.querySelector('[data-slot="kbd-content"]')?.textContent).toBe("K");
    expect(container.querySelector('[data-slot="separator"]')?.className).toContain(
      "separator--vertical",
    );
    expect(container.querySelector('[data-slot="separator"]')?.className).toContain(
      "separator--secondary",
    );
  });
});
