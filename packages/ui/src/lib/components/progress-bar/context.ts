import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type ProgressBarContextValue = {
  isIndeterminate?: boolean;
  percentage?: number;
  slots?: SlotMap;
  valueText?: string;
};

export const [getProgressBarContext, setProgressBarContext] =
  createContext<ProgressBarContextValue>();
