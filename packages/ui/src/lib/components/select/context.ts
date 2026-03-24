import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type SelectItemOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type SelectContextValue = SlotsContextValue & {
  items?: SelectItemOption[];
  open?: boolean;
  placeholder?: string;
  registerItem?: (item: SelectItemOption) => void;
  type?: "multiple" | "single";
  valueText?: string;
};

export const [getSelectContext, setSelectContext] = createSlotsContext<SelectContextValue>();
