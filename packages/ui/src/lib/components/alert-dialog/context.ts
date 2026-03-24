import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type AlertDialogPlacement = "auto" | "bottom" | "center" | "top";

export type AlertDialogContextValue = {
  close: () => void;
  isDismissable: boolean;
  isKeyboardDismissDisabled: boolean;
  open: boolean;
  placement: AlertDialogPlacement;
  slots: SlotMap;
};

export const [getAlertDialogContext, setAlertDialogContext] =
  createContext<AlertDialogContextValue>();
