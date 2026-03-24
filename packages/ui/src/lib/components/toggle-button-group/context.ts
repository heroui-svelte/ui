import type {SlotMap} from "../../internal/slots";
import type {ToggleButtonVariants} from "@heroui-svelte/styles";

import {createContext} from "svelte";

export type ToggleButtonGroupContextValue = {
  isDisabled?: boolean;
  size?: ToggleButtonVariants["size"];
  slots?: SlotMap;
};

export const [getToggleButtonGroupContext, setToggleButtonGroupContext] =
  createContext<ToggleButtonGroupContextValue>();
