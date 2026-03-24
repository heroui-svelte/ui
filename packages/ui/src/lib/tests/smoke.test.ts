import {render} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import * as ui from "../index";

const stableRoots = [
  "Accordion",
  "AlertDialog",
  "Autocomplete",
  "Avatar",
  "Badge",
  "Breadcrumbs",
  "Button",
  "ButtonGroup",
  "Card",
  "Checkbox",
  "CheckboxGroup",
  "Chip",
  "ColorArea",
  "ColorField",
  "ColorPicker",
  "ColorSlider",
  "ColorSwatch",
  "ColorSwatchPicker",
  "CloseButton",
  "ComboBox",
  "DateField",
  "DatePicker",
  "DateRangePicker",
  "Description",
  "Disclosure",
  "DisclosureGroup",
  "Drawer",
  "Dropdown",
  "EmptyState",
  "ErrorMessage",
  "FieldError",
  "Fieldset",
  "Form",
  "Header",
  "Input",
  "InputGroup",
  "InputOTP",
  "Kbd",
  "Label",
  "Link",
  "ListBox",
  "ListBoxItem",
  "ListBoxSection",
  "Menu",
  "MenuItem",
  "MenuSection",
  "Meter",
  "Modal",
  "NumberField",
  "Pagination",
  "Popover",
  "ProgressBar",
  "ProgressCircle",
  "Radio",
  "RadioGroup",
  "ScrollShadow",
  "SearchField",
  "Select",
  "Separator",
  "Skeleton",
  "Slider",
  "Spinner",
  "Surface",
  "Switch",
  "SwitchGroup",
  "Table",
  "Tabs",
  "Tag",
  "TagGroup",
  "Text",
  "TextArea",
  "TextField",
  "TimeField",
  "Toast",
  "ToggleButton",
  "ToggleButtonGroup",
  "Toolbar",
  "Tooltip",
  "Alert",
] as const;

describe("export surface", () => {
  it("exposes the full stable root surface", () => {
    expect(stableRoots).toHaveLength(79);

    for (const name of stableRoots) {
      expect(ui[name]).toBeDefined();
    }

    expect(ui.IconChevronDown).toBeDefined();
    expect(ui.IconExternalLink).toBeDefined();
  });
});

describe("component smoke rendering", () => {
  it("renders all stable root components without crashing", () => {
    for (const name of stableRoots) {
      const Component = ui[name] as any;
      const {container, unmount} = render(Component, {
        props: {
          children: () => "Smoke",
          href: "#",
        },
      });

      expect(container).toBeTruthy();
      expect(unmount).toBeTypeOf("function");
      unmount();
    }
  });
});
