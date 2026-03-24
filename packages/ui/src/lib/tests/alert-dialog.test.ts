import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import AlertDialogHarness from "./fixtures/alert-dialog-harness.svelte";

describe("alert-dialog", () => {
  it("opens the alert dialog content from the trigger", async () => {
    render(AlertDialogHarness);

    expect(screen.queryByText("This action cannot be undone.")).toBeNull();

    await fireEvent.click(screen.getByRole("button", {name: /open alert dialog/i}));

    expect(await screen.findByText("This action cannot be undone.")).toBeTruthy();
    expect(screen.getByText("Delete item")).toBeTruthy();
  });
});
