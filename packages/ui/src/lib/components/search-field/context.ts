import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type SearchFieldContextValue = {
  clear?: () => void;
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
  setHasError?: (present: boolean) => void;
  setInputElement?: (element: HTMLInputElement | null) => void;
  setValue?: (nextValue: string) => void;
  slots?: SlotMap;
  type?: string;
  value?: string;
};

export const [getSearchFieldContext, setSearchFieldContext] =
  createContext<SearchFieldContextValue>();
