import type {SlotMap} from "../../internal/slots";
import type {ButtonVariants} from "@heroui-svelte/styles";

import {createContext} from "svelte";

export type ButtonGroupContextValue = {
  fullWidth?: boolean;
  isDisabled?: boolean;
  size?: ButtonVariants["size"];
  slots?: SlotMap;
  variant?: ButtonVariants["variant"];
};

export const [getButtonGroupContext, setButtonGroupContext] =
  createContext<ButtonGroupContextValue>();
