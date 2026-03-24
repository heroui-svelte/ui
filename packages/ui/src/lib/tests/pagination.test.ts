import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import PaginationHarness from "./fixtures/pagination-harness.svelte";

describe("pagination", () => {
  it("maps the legacy slot contract, active state, and default nav icons", () => {
    const {container} = render(PaginationHarness);

    const navigation = screen.getByRole("navigation", {name: /^pagination$/i});
    const summary = screen.getByText("Page 2 of 8");
    const activeLink = screen.getByRole("button", {name: "2"});
    const previous = screen.getByRole("button", {name: /previous page/i});
    const next = screen.getByRole("button", {name: /next page/i});
    const ellipsis = container.querySelector('[data-slot="pagination-ellipsis"]');
    const previousIcon = container.querySelector('[data-slot="pagination-previous-icon"] svg');
    const nextIcon = container.querySelector('[data-slot="pagination-next-icon"] svg');

    expect(navigation.className).toContain("pagination");
    expect(navigation.className).toContain("pagination--sm");
    expect(summary.getAttribute("data-slot")).toBe("pagination-summary");
    expect(activeLink.getAttribute("aria-current")).toBe("page");
    expect(activeLink.getAttribute("data-active")).toBe("true");
    expect(previous.className).toContain("pagination__link");
    expect(previous.className).toContain("pagination__link--nav");
    expect(next.className).toContain("pagination__link");
    expect(next.className).toContain("pagination__link--nav");
    expect(ellipsis?.textContent).toContain("…");
    expect(previousIcon).toBeTruthy();
    expect(nextIcon).toBeTruthy();
  });

  it("renders anchors when href is provided and preserves disabled semantics", async () => {
    const onDisabledButtonClick = vi.fn();
    const onDisabledAnchorClick = vi.fn();
    const onEnabledAnchorClick = vi.fn();

    const {container} = render(PaginationHarness, {
      props: {
        onDisabledAnchorClick,
        onDisabledButtonClick,
        onEnabledAnchorClick,
      },
    });

    const activeAnchor = screen.getByRole("link", {name: "Page 3 link"});
    const nextAnchor = screen.getByRole("link", {name: "Next linked page"});
    const disabledButton = screen.getByRole("button", {name: "Disabled page button"});
    const disabledPreviousAnchor = container.querySelector(
      '[data-slot="pagination-previous"][aria-label="Previous linked page"]',
    );

    expect(activeAnchor.tagName).toBe("A");
    expect(activeAnchor.getAttribute("aria-current")).toBe("page");
    expect(activeAnchor.getAttribute("href")).toBe("/pages/3");
    expect(nextAnchor.tagName).toBe("A");
    expect(nextAnchor.getAttribute("href")).toBe("/pages/4");
    expect(nextAnchor.className).toContain("pagination__link--nav");
    expect(disabledButton.hasAttribute("disabled")).toBe(true);
    expect(disabledButton.getAttribute("aria-disabled")).toBe("true");
    expect(disabledButton.getAttribute("data-disabled")).toBe("true");
    expect(disabledPreviousAnchor).toBeTruthy();
    expect(disabledPreviousAnchor?.tagName).toBe("A");
    expect(disabledPreviousAnchor?.getAttribute("aria-disabled")).toBe("true");
    expect(disabledPreviousAnchor?.getAttribute("data-disabled")).toBe("true");
    expect(disabledPreviousAnchor?.getAttribute("href")).toBeNull();

    await fireEvent.click(disabledButton);
    await fireEvent.click(disabledPreviousAnchor as Element);
    await fireEvent.click(nextAnchor);

    expect(onDisabledButtonClick).not.toHaveBeenCalled();
    expect(onDisabledAnchorClick).not.toHaveBeenCalled();
    expect(onEnabledAnchorClick).toHaveBeenCalledTimes(1);
  });
});
