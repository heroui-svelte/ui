import {render, screen, waitFor} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import StructuralHarness from "./fixtures/structural-harness.svelte";

describe("structural component tranche", () => {
  it("preserves the expected markup contracts for navigation and utility components", async () => {
    const {container} = render(StructuralHarness);

    expect(container.querySelector('[data-slot="header"]')?.textContent).toContain("Preferences");
    expect(screen.getByRole("form", {name: /profile form/i})).toBeTruthy();

    const breadcrumbLinks = container.querySelectorAll('[data-slot="breadcrumbs-link"]');
    const separators = container.querySelectorAll('[data-slot="breadcrumbs-separator"]');

    expect(breadcrumbLinks).toHaveLength(3);
    expect(separators).toHaveLength(2);
    expect(breadcrumbLinks[0]?.className).toContain("breadcrumbs__link");
    expect(breadcrumbLinks[2]?.getAttribute("aria-current")).toBe("page");

    expect(container.querySelector('[data-slot="error-message"]')?.tagName).toBe("P");
    expect(container.querySelector('[data-slot="fieldset"]')?.tagName).toBe("FIELDSET");
    expect(container.querySelector('[data-slot="fieldset-legend"]')?.textContent).toContain(
      "Profile settings",
    );
    expect(container.querySelector('[data-slot="fieldset-field-group"]')?.className).toContain(
      "fieldset__field_group",
    );

    const scrollShadow = container.querySelector(
      '[data-slot="scroll-shadow"]',
    ) as HTMLElement | null;

    expect(scrollShadow?.className).toContain("scroll-shadow--vertical");

    await waitFor(() => {
      expect(scrollShadow?.dataset.topBottomScroll).toBe("true");
    });

    expect(scrollShadow?.style.getPropertyValue("--scroll-shadow-size")).toBe("80px");
  });
});
