import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type ColorFieldGroupContextValue = {
  describedBy?: string;
  inputId?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  name?: string;
  slots?: SlotMap;
};

export const [getColorFieldGroupContext, setColorFieldGroupContext] =
  createContext<ColorFieldGroupContextValue>();
