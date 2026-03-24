import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type ListBoxItemContextValue = SlotsContextValue & {
  highlighted?: never;
  selected?: never;
};

export const [getListBoxItemContext, setListBoxItemContext] =
  createSlotsContext<ListBoxItemContextValue>();
