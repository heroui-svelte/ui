import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type SliderContextValue = SlotsContextValue & {
  handleValueChange?: (value: number | number[]) => void;
  handleValueCommit?: (value: number | number[]) => void;
  isDisabled?: boolean;
  max?: number;
  min?: number;
  orientation?: "horizontal" | "vertical";
  resolvedType?: "single" | "multiple";
  step?: number;
  valueLabels?: string[];
  values?: number[];
};

export const [getSliderContext, setSliderContext] = createSlotsContext<SliderContextValue>();
