import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type ChipContextValue = SlotsContextValue;

export const [getChipContext, setChipContext] = createSlotsContext<ChipContextValue>();
