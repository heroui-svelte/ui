import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type ProgressCircleContextValue = {
  isIndeterminate?: boolean;
  percentage?: number;
  slots?: SlotMap;
};

export const [getProgressCircleContext, setProgressCircleContext] =
  createContext<ProgressCircleContextValue>();
