import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import DrawerHarness from "./fixtures/drawer-harness.svelte";

describe("drawer", () => {
  it("opens and closes from its trigger and close trigger", async () => {
    render(DrawerHarness);

    expect(screen.queryByText("Drawer content")).toBeNull();

    await fireEvent.click(screen.getByRole("button", {name: /open drawer/i}));

    expect(await screen.findByText("Drawer content")).toBeTruthy();
    expect(screen.getByText("Drawer title")).toBeTruthy();

    await fireEvent.click(screen.getByRole("button", {name: /close/i}));

    expect(screen.queryByText("Drawer content")).toBeNull();
  });
});
