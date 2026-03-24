import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type TooltipContextValue = {
  slots: SlotMap;
};

export const [getTooltipContext, setTooltipContext] = createContext<TooltipContextValue>();
