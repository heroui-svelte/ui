import {createContext} from "svelte";

export type RadioGroupContextValue = {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  value?: string;
};

export const [getRadioGroupContext, setRadioGroupContext] = createContext<RadioGroupContextValue>();
