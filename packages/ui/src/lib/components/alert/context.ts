import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type AlertContextValue = {
  slots?: SlotMap;
  status?: "default" | "accent" | "success" | "warning" | "danger";
};

export const [getAlertContext, setAlertContext] = createContext<AlertContextValue>();
