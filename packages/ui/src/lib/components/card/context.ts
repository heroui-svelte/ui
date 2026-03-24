import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type CardContextValue = SlotsContextValue;

export const [getCardContext, setCardContext] = createSlotsContext<CardContextValue>();
