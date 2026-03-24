import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type AccordionContextValue = {
  hideSeparator: boolean;
  slots: SlotMap;
};

export const [getAccordionContext, setAccordionContext] = createContext<AccordionContextValue>();
