import type {SlotMap} from "./slots";

import {createContext} from "svelte";

export type SlotsContextValue = {
  slots?: SlotMap;
};

export const createSlotsContext = <T extends SlotsContextValue = SlotsContextValue>() =>
  createContext<T>();

export const safeGetContext = <T>(getter: () => T) => {
  try {
    return getter();
  } catch {
    return undefined;
  }
};
