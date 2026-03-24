import {render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import TextFieldHarness from "./fixtures/textfield-harness.svelte";

describe("textfield", () => {
  it("links labels and propagates root field props to nested input groups", () => {
    const {container} = render(TextFieldHarness);

    const textField = container.querySelector('[data-slot="textfield"]');
    const inputGroup = container.querySelector('[data-slot="input-group"]');
    const input = screen.getByRole("textbox", {name: "Email"}) as HTMLInputElement;
    const description = screen.getByText("We will only use this for updates.");
    const error = screen.getByText("Please enter a valid email address.");
    const describedBy = input.getAttribute("aria-describedby") ?? "";

    expect(textField?.className).toContain("textfield");
    expect(textField?.className).toContain("textfield--full-width");
    expect(textField?.getAttribute("data-invalid")).toBe("true");
    expect(inputGroup?.className).toContain("input-group--secondary");
    expect(input.getAttribute("data-slot")).toBe("input-group-input");
    expect(input.value).toBe("jude@example.com");
    expect(input.getAttribute("name")).toBe("email");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.required).toBe(true);
    expect(describedBy).toContain(description.getAttribute("id") ?? "");
    expect(describedBy).toContain(error.getAttribute("id") ?? "");
  });
});
