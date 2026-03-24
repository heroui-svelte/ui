import type {ColorInputValue, HeroColor} from "../../internal/color";
import type {SlotsContextValue} from "../../internal/context";

import {createContext} from "svelte";

import {createSlotsContext} from "../../internal/context";

export type ColorSwatchPickerContextValue = SlotsContextValue & {
  color?: HeroColor | null;
  isDisabled?: boolean;
  setColor?: (color: ColorInputValue) => void;
};

export type ColorSwatchPickerItemContextValue = {
  color?: HeroColor;
  isDisabled?: boolean;
  isSelected?: boolean;
};

export const [getColorSwatchPickerContext, setColorSwatchPickerContext] =
  createSlotsContext<ColorSwatchPickerContextValue>();
export const [getColorSwatchPickerItemContext, setColorSwatchPickerItemContext] =
  createContext<ColorSwatchPickerItemContextValue>();
