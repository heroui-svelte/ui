import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type BadgeContextValue = SlotsContextValue;

export const [getBadgeContext, setBadgeContext] = createSlotsContext<BadgeContextValue>();
