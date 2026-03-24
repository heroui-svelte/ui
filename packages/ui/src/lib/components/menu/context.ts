import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type MenuSelectionMode = "multiple" | "none" | "single";

export type MenuContextValue = SlotsContextValue & {
  onAction?: (key: string) => void;
  selectionMode?: MenuSelectionMode;
};

export const [getMenuContext, setMenuContext] = createSlotsContext<MenuContextValue>();
