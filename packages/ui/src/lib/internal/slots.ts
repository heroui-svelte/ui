export type SlotResolver = (props?: Record<string, any>) => string;
export type SlotMap = Record<string, SlotResolver | undefined>;

export const normalizeVariantResult = (result: unknown, fallbackClass: string): SlotMap => {
  if (typeof result === "function") {
    return {base: result as SlotResolver};
  }

  if (typeof result === "string") {
    return {base: () => result || fallbackClass};
  }

  if (result && typeof result === "object") {
    return result as SlotMap;
  }

  return {base: () => fallbackClass};
};

export const withDataState = (value: unknown) => (value ? "true" : undefined);
