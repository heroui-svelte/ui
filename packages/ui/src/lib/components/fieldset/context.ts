import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type FieldsetContextValue = SlotsContextValue;

export const [getFieldsetContext, setFieldsetContext] = createSlotsContext<FieldsetContextValue>();
