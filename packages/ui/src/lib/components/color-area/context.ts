import type {ColorChannel, ColorInputValue, ColorSpace, HeroColor} from "../../internal/color";
import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type ColorAreaContextValue = SlotsContextValue & {
  background?: string;
  color?: HeroColor;
  isDisabled?: boolean;
  isDragging?: boolean;
  isFocusVisible?: boolean;
  onAreaKeydown?: (event: KeyboardEvent) => void;
  onPointerStart?: (event: PointerEvent) => void;
  setColor?: (color: ColorInputValue) => void;
  thumbColor?: string;
  thumbStyle?: string;
  xChannel?: ColorChannel;
  yChannel?: ColorChannel;
  colorSpace?: ColorSpace;
};

export const [getColorAreaContext, setColorAreaContext] =
  createSlotsContext<ColorAreaContextValue>();
