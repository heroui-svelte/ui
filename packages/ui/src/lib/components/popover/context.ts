import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type PopoverContextValue = {
  slots: SlotMap;
};

export const [getPopoverContext, setPopoverContext] = createContext<PopoverContextValue>();
