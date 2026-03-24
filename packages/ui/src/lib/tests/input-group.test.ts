import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import InputGroupHarness from "./fixtures/input-group-harness.svelte";

describe("input-group", () => {
  it("propagates root field state and only focuses the field from non-interactive wrapper clicks", async () => {
    const {container} = render(InputGroupHarness);

    const groups = container.querySelectorAll('[data-slot="input-group"]');
    const usernameInput = screen.getByRole("textbox", {name: /username/i});
    const notesField = screen.getByRole("textbox", {name: /notes/i}) as HTMLTextAreaElement;
    const commandInput = screen.getByRole("textbox", {name: /command/i});
    const copyButton = screen.getByRole("button", {name: /copy/i});
    const prefix = container.querySelector('[data-slot="input-group-prefix"]');
    const suffix = container.querySelector('[data-slot="input-group-suffix"]');
    const textArea = container.querySelector('[data-slot="input-group-textarea"]');

    expect(groups[0]?.className).toContain("input-group--full-width");
    expect(groups[0]?.className).toContain("input-group--secondary");
    expect(prefix?.textContent).toBe("@");
    expect(suffix?.textContent).toBe(".com");
    expect(textArea?.className).toContain("input-group__input");
    expect(groups[1]?.getAttribute("data-invalid")).toBe("true");
    expect(notesField.disabled).toBe(true);
    expect(notesField.required).toBe(true);
    expect(notesField.getAttribute("aria-invalid")).toBe("true");

    await fireEvent.click(groups[0] as HTMLElement);

    expect(document.activeElement).toBe(usernameInput);
    expect(notesField.getAttribute("data-slot")).toBe("input-group-textarea");

    copyButton.focus();
    await fireEvent.click(copyButton);

    expect(document.activeElement).toBe(copyButton);
    expect(document.activeElement).not.toBe(commandInput);
  });
});
