import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type DisclosureContextValue = {
  contentId?: string;
  isDisabled?: boolean;
  isExpanded?: boolean;
  slots?: SlotMap;
  toggle?: () => void;
  triggerId?: string;
};

export const [getDisclosureContext, setDisclosureContext] = createContext<DisclosureContextValue>();
