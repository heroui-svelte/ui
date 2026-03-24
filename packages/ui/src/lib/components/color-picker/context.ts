import type {ColorInputValue, HeroColor} from "../../internal/color";
import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type ColorPickerContextValue = SlotsContextValue & {
  color?: HeroColor;
  open?: boolean;
  setColor?: (color: ColorInputValue) => void;
};

export const [getColorPickerContext, setColorPickerContext] =
  createSlotsContext<ColorPickerContextValue>();
