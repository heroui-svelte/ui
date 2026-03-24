import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type ModalPlacement = "auto" | "bottom" | "center" | "top";

export type ModalContextValue = {
  close: () => void;
  isDismissable: boolean;
  isKeyboardDismissDisabled: boolean;
  open: boolean;
  placement: ModalPlacement;
  slots: SlotMap;
};

export const [getModalContext, setModalContext] = createContext<ModalContextValue>();
