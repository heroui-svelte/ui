import type {SlotsContextValue} from "../../internal/context";
import type {ToastVariants} from "@heroui-svelte/styles";

import {createSlotsContext} from "../../internal/context";

export type ToastContextValue = SlotsContextValue & {
  gap?: number;
  heightsByKey?: Record<string, number>;
  isLoading?: boolean;
  maxVisibleToasts?: number;
  orderedToastIds?: string[];
  placement?: ToastVariants["placement"];
  registerToast?: (key: string, node: HTMLElement) => void;
  scaleFactor?: number;
  unregisterToast?: (key: string) => void;
  updateToastHeight?: (key: string, height: number) => void;
  variant?: ToastVariants["variant"];
};

export const [getToastContext, setToastContext] = createSlotsContext<ToastContextValue>();
