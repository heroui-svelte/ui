import type {SlotMap} from "../../internal/slots";
import type {TagVariants} from "@heroui-svelte/styles";

import {createContext} from "svelte";

export type TagGroupContextValue = {
  disabledValues?: string[];
  isDisabled?: boolean;
  removeValue?: (value: string) => void;
  selectedValues?: string[];
  selectionMode?: "multiple" | "none" | "single";
  size?: TagVariants["size"];
  slots?: SlotMap;
  toggleValue?: (value: string) => void;
  variant?: TagVariants["variant"];
};

export const [getTagGroupContext, setTagGroupContext] = createContext<TagGroupContextValue>();
