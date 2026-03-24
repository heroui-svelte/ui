import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type RadioContextValue = {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  isSelected?: boolean;
  slots?: SlotMap;
};

export const [getRadioContext, setRadioContext] = createContext<RadioContextValue>();
