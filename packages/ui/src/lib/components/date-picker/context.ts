import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type DatePickerContextValue = SlotsContextValue & {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

export const [getDatePickerContext, setDatePickerContext] =
  createSlotsContext<DatePickerContextValue>();
