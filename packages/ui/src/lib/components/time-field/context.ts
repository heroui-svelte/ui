import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type TimeFieldContextValue = SlotsContextValue & {
  fullWidth?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  name?: string;
};

export type TimeFieldGroupContextValue = SlotsContextValue;

export const [getTimeFieldContext, setTimeFieldContext] =
  createSlotsContext<TimeFieldContextValue>();

export const [getTimeFieldGroupContext, setTimeFieldGroupContext] =
  createSlotsContext<TimeFieldGroupContextValue>();
