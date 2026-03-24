import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type InputGroupContextValue = {
  describedBy?: string;
  inputId?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  name?: string;
  setValue?: (value: string) => void;
  slots?: SlotMap;
  type?: string;
  value?: string;
};

export const [getInputGroupContext, setInputGroupContext] = createContext<InputGroupContextValue>();
