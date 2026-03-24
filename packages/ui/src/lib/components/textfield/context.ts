import {createContext} from "svelte";

export type TextFieldContextValue = {
  describedBy?: string;
  descriptionId?: string;
  errorMessageId?: string;
  inputId?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  name?: string;
  setHasDescription?: (present: boolean) => void;
  setHasErrorMessage?: (present: boolean) => void;
  setValue?: (value: string) => void;
  type?: string;
  value?: string;
  variant?: "primary" | "secondary";
};

export const [getTextFieldContext, setTextFieldContext] = createContext<TextFieldContextValue>();
