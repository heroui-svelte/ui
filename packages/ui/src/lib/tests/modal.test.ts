import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import ModalHarness from "./fixtures/modal-harness.svelte";

describe("modal", () => {
  it("opens and closes from its trigger and close trigger", async () => {
    render(ModalHarness);

    expect(screen.queryByText("Modal content")).toBeNull();

    await fireEvent.click(screen.getByRole("button", {name: /open modal/i}));

    expect(await screen.findByText("Modal content")).toBeTruthy();
    expect(screen.getByText("Modal title")).toBeTruthy();

    await fireEvent.click(screen.getByRole("button", {name: /close/i}));

    expect(screen.queryByText("Modal content")).toBeNull();
  });
});
