import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type DateRangePickerContextValue = SlotsContextValue & {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
};

export const [getDateRangePickerContext, setDateRangePickerContext] =
  createSlotsContext<DateRangePickerContextValue>();
