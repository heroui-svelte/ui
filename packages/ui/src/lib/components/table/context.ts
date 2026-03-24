import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type TableContextValue = SlotsContextValue;

export const [getTableContext, setTableContext] = createSlotsContext<TableContextValue>();
