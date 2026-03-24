import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type CheckboxContextValue = {
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isSelected?: boolean;
  slots?: SlotMap;
};

export const [getCheckboxContext, setCheckboxContext] = createContext<CheckboxContextValue>();
