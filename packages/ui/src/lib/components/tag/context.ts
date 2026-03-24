import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type TagContextValue = {
  isDisabled?: boolean;
  isSelected?: boolean;
  onRemove?: () => void;
  slots?: SlotMap;
};

export const [getTagContext, setTagContext] = createContext<TagContextValue>();
