import {render} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import TableHarness from "./fixtures/table-harness.svelte";

describe("table", () => {
  it("renders the expected wrapper, semantic content stack, and load-more row", () => {
    const {container} = render(TableHarness);

    expect(container.querySelector('[data-slot="table"]')?.tagName).toBe("DIV");
    expect(container.querySelector('[data-slot="table"]')?.className).toContain("table-root");
    expect(container.querySelector('[data-slot="table-content"]')?.tagName).toBe("TABLE");
    expect(container.querySelector('[data-slot="table-header"]')?.tagName).toBe("THEAD");
    expect(container.querySelector('[data-slot="table-body"]')?.tagName).toBe("TBODY");
    expect(container.querySelector('[data-slot="table-row"]')?.tagName).toBe("TR");
    expect(container.querySelector('[data-slot="table-cell"]')?.tagName).toBe("TD");
    expect(container.querySelector('[data-slot="table-load-more"]')?.tagName).toBe("TR");
    expect(container.querySelector('[data-slot="table-footer"]')?.tagName).toBe("DIV");
  });
});
