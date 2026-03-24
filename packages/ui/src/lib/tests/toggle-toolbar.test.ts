import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import ToggleToolbarHarness from "./fixtures/toggle-toolbar-harness.svelte";

describe("toggle-button and toolbar", () => {
  it("propagates group sizing and toolbar orientation while preserving selection callbacks", async () => {
    const onGroupChange = vi.fn();
    const onStandaloneChange = vi.fn();

    const {container} = render(ToggleToolbarHarness, {
      props: {
        onGroupChange,
        onStandaloneChange,
      },
    });

    const toolbar = container.querySelector('[data-slot="toolbar"]');
    const boldButton = screen.getByRole("button", {name: /bold/i});
    const italicButton = screen.getByRole("button", {name: /italic/i});
    const likeButton = screen.getByRole("button", {name: /like/i});
    const groupSeparator = container.querySelector('[data-slot="toggle-button-group-separator"]');
    const separator = container.querySelector('[data-slot="separator"]');

    expect(toolbar?.className).toContain("toolbar--vertical");
    expect(toolbar?.className).toContain("toolbar--attached");
    expect(separator?.className).toContain("separator--horizontal");
    expect(groupSeparator?.className).toContain("toggle-button-group__separator");
    expect(boldButton.className).toContain("toggle-button--sm");
    expect(italicButton.className).toContain("toggle-button--sm");
    expect(likeButton.className).toContain("toggle-button--ghost");
    expect(likeButton.getAttribute("data-selected")).toBe("true");

    await fireEvent.click(italicButton);

    expect(onGroupChange).toHaveBeenCalled();
    expect(Array.from(onGroupChange.mock.lastCall?.[0] ?? [])).toContain("italic");
    expect(italicButton.getAttribute("data-selected")).toBe("true");

    await fireEvent.click(likeButton);

    expect(onStandaloneChange).toHaveBeenLastCalledWith(false);
    expect(likeButton.getAttribute("data-selected")).toBeNull();
  });
});
