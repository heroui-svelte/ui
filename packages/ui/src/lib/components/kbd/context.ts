import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type KbdContextValue = SlotsContextValue;

export const [getKbdContext, setKbdContext] = createSlotsContext<KbdContextValue>();
