import type {ColorChannel, ColorInputValue, ColorSpace, HeroColor} from "../../internal/color";

import {createContext} from "svelte";

export type ColorFieldContextValue = {
  channel?: ColorChannel;
  color?: HeroColor | null;
  colorSpace?: ColorSpace;
  inputValue?: string;
  setColor?: (color: ColorInputValue) => void;
  setInputValue?: (value: string) => void;
};

export const [getColorFieldContext, setColorFieldContext] = createContext<ColorFieldContextValue>();
