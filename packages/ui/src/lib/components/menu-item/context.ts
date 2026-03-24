import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type MenuItemContextValue = SlotsContextValue & {
  hasSubmenu?: boolean;
};

export const [getMenuItemContext, setMenuItemContext] = createSlotsContext<MenuItemContextValue>();
