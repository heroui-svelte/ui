import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type MeterContextValue = {
  percentage?: number;
  slots?: SlotMap;
  valueText?: string;
};

export const [getMeterContext, setMeterContext] = createContext<MeterContextValue>();
