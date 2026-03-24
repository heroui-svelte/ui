import type {SlotsContextValue} from "../../internal/context";
import type {SelectItemOption} from "../select/context";

import {createSlotsContext} from "../../internal/context";

export type AutocompleteContextValue = SlotsContextValue & {
  clearSelection?: () => void;
  items?: SelectItemOption[];
  open?: boolean;
  placeholder?: string;
  registerItem?: (item: SelectItemOption) => void;
  selectionMode?: "multiple" | "single";
  valueText?: string;
};

export const [getAutocompleteContext, setAutocompleteContext] =
  createSlotsContext<AutocompleteContextValue>();
