import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type SwitchContextValue = {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isSelected?: boolean;
  slots?: SlotMap;
};

export const [getSwitchContext, setSwitchContext] = createContext<SwitchContextValue>();
