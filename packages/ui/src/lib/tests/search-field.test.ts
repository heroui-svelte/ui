import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import SearchFieldHarness from "./fixtures/search-field-harness.svelte";

describe("search-field", () => {
  it("links labels, propagates root props, and clears through the input event path", async () => {
    const onChange = vi.fn();
    const onInput = vi.fn();
    const onValueChange = vi.fn();
    const {container} = render(SearchFieldHarness, {
      props: {
        onChange,
        onInput,
        onValueChange,
      },
    });

    const root = container.querySelector('[data-slot="search-field"]');
    const group = container.querySelector('[data-slot="search-field-group"]');
    const input = screen.getByRole("searchbox", {name: "Search docs"}) as HTMLInputElement;
    const clearButton = screen.getByRole("button", {name: /clear search/i});
    const description = screen.getByText("Search through the documentation.");
    const searchIcon = container.querySelector('[data-slot="search-field-search-icon"] svg');

    expect(root?.className).toContain("search-field--full-width");
    expect(root?.className).toContain("search-field--secondary");
    expect(root?.getAttribute("data-empty")).toBeNull();
    expect(group?.className).toContain("search-field__group--full-width");
    expect(searchIcon).toBeTruthy();
    expect(input.value).toBe("hero");
    expect(input.getAttribute("name")).toBe("search");
    expect(input.required).toBe(true);
    expect(input.getAttribute("aria-describedby")).toContain(description.getAttribute("id") ?? "");

    await fireEvent.click(clearButton);

    expect(onValueChange).toHaveBeenLastCalledWith("");
    expect(onChange).toHaveBeenLastCalledWith("");
    expect(onInput).toHaveBeenLastCalledWith("");
    expect(input.value).toBe("");
    expect(root?.getAttribute("data-empty")).toBe("true");
  });
});
