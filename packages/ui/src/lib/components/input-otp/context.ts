import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type InputOTPCell = {
  char: string | null | undefined;
  hasFakeCaret: boolean;
  isActive: boolean;
};

export type InputOTPContextValue = SlotsContextValue & {
  isDisabled?: boolean;
  isInvalid?: boolean;
  maxLength?: number;
  value?: string;
};

export const [getInputOTPContext, setInputOTPContext] = createSlotsContext<InputOTPContextValue>();
