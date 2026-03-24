import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type NumberFieldContextValue = {
  describedBy?: string;
  displayValue?: string;
  formatOptions?: Intl.NumberFormatOptions;
  canDecrement?: boolean;
  canIncrement?: boolean;
  focusInput?: () => void;
  handleBlur?: () => void;
  handleFocus?: () => void;
  handleInput?: (nextValue: string) => void;
  inputId?: string;
  inputMode?: "decimal" | "numeric";
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  labelId?: string;
  maxValue?: number;
  minValue?: number;
  name?: string;
  registerInputElement?: (element: HTMLInputElement | null) => void;
  setValue?: (nextValue: number | undefined) => void;
  slots?: SlotMap;
  stepBy?: (delta: number) => void;
  value?: number;
};

export const [getNumberFieldContext, setNumberFieldContext] =
  createContext<NumberFieldContextValue>();
