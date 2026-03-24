import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import TagGroupHarness from "./fixtures/tag-group-harness.svelte";

describe("tag-group", () => {
  it("propagates size/variant and toggles selection and removal", async () => {
    const onGroupChange = vi.fn();
    const onRemove = vi.fn();

    const {container} = render(TagGroupHarness, {
      props: {
        onGroupChange,
        onRemove,
      },
    });

    const newsTag = screen.getByText("News").closest('[data-slot="tag"]');
    const travelTag = screen.getByText("Travel").closest('[data-slot="tag"]');
    const removeButton = container.querySelector('[data-slot="tag-remove-button"]');

    if (!newsTag) {
      throw new Error("Expected news tag");
    }

    expect(newsTag.className).toContain("tag--sm");
    expect(newsTag.className).toContain("tag--surface");
    expect(removeButton).toBeTruthy();

    if (!travelTag) {
      throw new Error("Expected travel tag");
    }

    await fireEvent.click(travelTag);

    expect(onGroupChange).toHaveBeenCalled();
    expect(Array.from(onGroupChange.mock.lastCall?.[0] ?? [])).toContain("travel");
    expect(travelTag.getAttribute("data-selected")).toBe("true");

    if (!removeButton) {
      throw new Error("Expected tag remove button");
    }

    await fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalled();
  });
});
