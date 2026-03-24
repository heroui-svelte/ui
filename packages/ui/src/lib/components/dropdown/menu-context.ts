import {createContext} from "svelte";

export type DropdownSelectionMode = "multiple" | "none" | "single";

export type DropdownMenuContextValue = {
  onAction?: (key: string) => void;
  selectionMode?: DropdownSelectionMode;
};

export const [getDropdownMenuContext, setDropdownMenuContext] =
  createContext<DropdownMenuContextValue>();
