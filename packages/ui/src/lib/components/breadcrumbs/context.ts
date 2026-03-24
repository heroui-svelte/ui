import type {SlotMap} from "../../internal/slots";
import type {Snippet} from "svelte";

import {createContext} from "svelte";

export type BreadcrumbsContextValue = {
  isDisabled?: boolean;
  separator?: Snippet;
  slots?: SlotMap;
};

export const [getBreadcrumbsContext, setBreadcrumbsContext] =
  createContext<BreadcrumbsContextValue>();
