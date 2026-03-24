import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type LinkContextValue = SlotsContextValue;

export const [getLinkContext, setLinkContext] = createSlotsContext<LinkContextValue>();
