import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import SwitchHarness from "./fixtures/switch-harness.svelte";

describe("switch", () => {
  it("toggles selected state and renders the switch group layout container", async () => {
    const onChange = vi.fn();

    const {container} = render(SwitchHarness, {
      props: {
        onChange,
      },
    });

    const notificationsSwitch = screen.getByRole("switch", {name: /notifications/i});
    const switchGroup = container.querySelector('[data-slot="switch-group"]');
    const items = container.querySelector('[data-slot="switch-group-items"]');

    expect(notificationsSwitch.className).toContain("switch--lg");
    expect(items?.className).toContain("switch-group__items");
    expect(switchGroup?.getAttribute("data-orientation")).toBe("horizontal");

    await fireEvent.click(notificationsSwitch);

    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(notificationsSwitch.getAttribute("data-selected")).toBe("true");
  });
});
