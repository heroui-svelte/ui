import type {SlotsContextValue} from "../../internal/context";

import {createSlotsContext} from "../../internal/context";

export type ComboBoxContextValue = SlotsContextValue & {
  open?: boolean;
  registerItem?: (value: string, label: string) => void;
  value?: string;
};

export const [getComboBoxContext, setComboBoxContext] = createSlotsContext<ComboBoxContextValue>();
