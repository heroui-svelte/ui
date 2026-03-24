import type {CheckboxVariants} from "@heroui-svelte/styles";

import {createContext} from "svelte";

export type CheckboxGroupContextValue = {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  value: string[];
  variant?: CheckboxVariants["variant"];
};

export const [getCheckboxGroupContext, setCheckboxGroupContext] =
  createContext<CheckboxGroupContextValue>();
