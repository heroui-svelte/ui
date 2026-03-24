import {createContext} from "svelte";

export type ToolbarContextValue = {
  orientation?: "horizontal" | "vertical";
};

export const [getToolbarContext, setToolbarContext] = createContext<ToolbarContextValue>();
