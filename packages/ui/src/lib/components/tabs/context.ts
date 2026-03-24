import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type TabsContextValue = {
  orientation: "horizontal" | "vertical";
  slots: SlotMap;
};

export const [getTabsContext, setTabsContext] = createContext<TabsContextValue>();
