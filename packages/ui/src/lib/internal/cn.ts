import type {VariantProps} from "tailwind-variants";

import {cx, tv} from "tailwind-variants";

export const cn = (...values: Array<string | false | null | undefined>) =>
  cx(...values.filter(Boolean));

export {tv};
export type {VariantProps};
