import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type DropdownContextValue = SlotsContextValue & {
  open?: boolean;
};

export const [getDropdownContext, setDropdownContext] = createSlotsContext<DropdownContextValue>();
