import {render, screen} from "@testing-library/svelte";
import {beforeAll, describe, expect, it, vi} from "vitest";

import TooltipHarness from "./fixtures/tooltip-harness.svelte";

describe("tooltip", () => {
  beforeAll(() => {
    vi.stubGlobal(
      "ResizeObserver",
      class ResizeObserver {
        disconnect() {}
        observe() {}
        unobserve() {}
      },
    );
  });

  it("renders content in controlled-open mode", () => {
    render(TooltipHarness, {
      props: {
        isOpen: true,
      },
    });

    expect(screen.getByText("Tooltip content")).toBeTruthy();
    expect(screen.getByRole("button", {name: /hover target/i})).toBeTruthy();
  });
});
