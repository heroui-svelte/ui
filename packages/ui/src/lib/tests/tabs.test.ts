import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import TabsHarness from "./fixtures/tabs-harness.svelte";

describe("tabs", () => {
  it("switches tabs and preserves the BEM/data-state contract", async () => {
    const onSelectionChange = vi.fn();

    render(TabsHarness, {
      props: {
        defaultSelectedKey: "overview",
        onSelectionChange,
      },
    });

    const overviewTab = screen.getByRole("tab", {name: /overview/i});
    const analyticsTab = screen.getByRole("tab", {name: /analytics/i});
    const reportsTab = screen.getByRole("tab", {name: /reports/i});

    expect(overviewTab.getAttribute("data-selected")).toBe("true");
    expect(analyticsTab.getAttribute("data-selected")).toBeNull();
    expect(reportsTab.getAttribute("data-disabled")).toBe("true");
    expect(screen.getByRole("tabpanel").textContent).toContain("Overview panel");

    await fireEvent.click(analyticsTab);

    expect(onSelectionChange).toHaveBeenLastCalledWith("analytics");
    expect(analyticsTab.getAttribute("data-selected")).toBe("true");
    expect(overviewTab.getAttribute("data-selected")).toBeNull();
    expect(screen.getByRole("tabpanel").textContent).toContain("Analytics panel");
  });
});
