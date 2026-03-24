import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type PaginationContextValue = SlotsContextValue;

export const [getPaginationContext, setPaginationContext] =
  createSlotsContext<PaginationContextValue>();
