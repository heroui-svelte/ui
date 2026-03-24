import type {SlotMap} from "../../internal/slots";

import {createContext} from "svelte";

export type AvatarContextValue = {
  hasImage?: boolean;
  imageFailed?: boolean;
  imageLoaded?: boolean;
  setHasImage?: (hasImage: boolean) => void;
  setImageFailed?: (failed: boolean) => void;
  setImageLoaded?: (loaded: boolean) => void;
  slots?: SlotMap;
};

export const [getAvatarContext, setAvatarContext] = createContext<AvatarContextValue>();
