import type {ColorChannel, ColorInputValue, ColorSpace, HeroColor} from "../../internal/color";
import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type ColorSliderContextValue = SlotsContextValue & {
  channel?: ColorChannel;
  color?: HeroColor;
  colorSpace?: ColorSpace;
  isDisabled?: boolean;
  isDragging?: boolean;
  isFocusVisible?: boolean;
  onTrackKeydown?: (event: KeyboardEvent) => void;
  onTrackPointerStart?: (event: PointerEvent) => void;
  orientation?: "horizontal" | "vertical";
  outputValue?: string;
  registerTrack?: (node: HTMLElement | null) => void;
  setColor?: (color: ColorInputValue) => void;
  setFocusVisible?: (visible: boolean) => void;
  thumbColor?: string;
  thumbStyle?: string;
  trackStyle?: string;
};

export const [getColorSliderContext, setColorSliderContext] =
  createSlotsContext<ColorSliderContextValue>();
