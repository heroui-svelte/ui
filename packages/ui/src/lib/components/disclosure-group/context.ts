import {createContext} from "svelte";

export type DisclosureGroupContextValue = {
  allowsMultipleExpanded?: boolean;
  expandedKeys?: string[];
  isDisabled?: boolean;
  toggleKey?: (key: string, nextExpanded?: boolean) => void;
};

export const [getDisclosureGroupContext, setDisclosureGroupContext] =
  createContext<DisclosureGroupContextValue>();
