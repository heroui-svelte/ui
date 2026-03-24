import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type DrawerPlacement = "bottom" | "left" | "right" | "top";

export type DrawerContextValue = {
  close: () => void;
  isDismissable: boolean;
  open: boolean;
  placement: DrawerPlacement;
  slots: SlotMap;
};

export const [getDrawerContext, setDrawerContext] = createContext<DrawerContextValue>();
