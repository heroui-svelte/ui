import {render, screen, waitFor} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import ToastHarness from "./fixtures/toast-harness.svelte";
import ToastLoadingHarness from "./fixtures/toast-loading-harness.svelte";
import ToastStackHarness from "./fixtures/toast-stack-harness.svelte";

describe("toast", () => {
  it("renders the toast region, variant classes, and default slot anatomy", () => {
    const {container} = render(ToastHarness);

    expect(container.querySelector('[data-slot="toast-region"]')?.className).toContain(
      "toast-region--top-end",
    );
    expect(container.querySelector('[data-slot="toast"]')?.className).toContain("toast--success");
    expect(container.querySelector('[data-slot="toast"]')?.className).toContain("toast--top-end");
    expect(
      container.querySelector('[data-slot="toast-indicator"] [data-slot="toast-default-icon"]'),
    ).toBeTruthy();
    expect(screen.getByText("Saved")).toBeTruthy();
    expect(screen.getByText("Profile updated")).toBeTruthy();
    expect(screen.getByRole("button", {name: /undo/i})).toBeTruthy();
    expect(screen.getByRole("button", {name: /close notification/i})).toBeTruthy();
  });

  it("renders a spinner in the default indicator when loading", () => {
    const {container} = render(ToastLoadingHarness);

    expect(container.querySelector('[data-slot="spinner"]')).toBeTruthy();
  });

  it("computes stack styles from provider order instead of requiring manual transforms", async () => {
    render(ToastStackHarness);

    await waitFor(() => {
      expect(screen.getByTestId("toast-new").getAttribute("data-index")).toBe("0");
      expect(screen.getByTestId("toast-old").getAttribute("data-index")).toBe("1");
    });

    expect(screen.getByTestId("toast-old").getAttribute("style")).toContain("translate: 0 -12px 0");
    expect(screen.getByTestId("toast-old").getAttribute("style")).toContain("scale: 0.95");
    expect(screen.getByTestId("toast-old").getAttribute("style")).toContain(
      "view-transition-name: toast-older",
    );
  });
});
