const FALLBACK_GROUP_SEPARATOR = ",";
const FALLBACK_DECIMAL_SEPARATOR = ".";
const FALLBACK_MINUS_SIGN = "-";
const FALLBACK_PERCENT_SIGN = "%";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getNumberFormatter = (formatOptions?: Intl.NumberFormatOptions) => {
  try {
    return new Intl.NumberFormat(undefined, formatOptions);
  } catch {
    return new Intl.NumberFormat();
  }
};

const getFormatterParts = (formatOptions?: Intl.NumberFormatOptions) => {
  const formatter = getNumberFormatter(formatOptions);
  const parts = formatter.formatToParts(-12345.6);

  return {
    decimal: parts.find((part) => part.type === "decimal")?.value ?? FALLBACK_DECIMAL_SEPARATOR,
    formatter,
    group: parts.find((part) => part.type === "group")?.value ?? FALLBACK_GROUP_SEPARATOR,
    minusSign: parts.find((part) => part.type === "minusSign")?.value ?? FALLBACK_MINUS_SIGN,
    percentSign: parts.find((part) => part.type === "percentSign")?.value ?? FALLBACK_PERCENT_SIGN,
  };
};

const getFractionDigits = (value: number) => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const normalized = value.toString().toLowerCase();

  if (normalized.includes("e-")) {
    return Number.parseInt(normalized.split("e-")[1] ?? "0", 10);
  }

  return normalized.split(".")[1]?.length ?? 0;
};

const roundToPrecision = (value: number, precision: number) => {
  const factor = 10 ** precision;

  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export const clampNumberValue = (value: number, minValue?: number, maxValue?: number) => {
  let nextValue = value;

  if (minValue !== undefined) {
    nextValue = Math.max(minValue, nextValue);
  }

  if (maxValue !== undefined) {
    nextValue = Math.min(maxValue, nextValue);
  }

  return nextValue;
};

export const formatNumberValue = (
  value: number | undefined,
  formatOptions?: Intl.NumberFormatOptions,
) => {
  if (value === undefined || Number.isNaN(value)) {
    return "";
  }

  return getNumberFormatter(formatOptions).format(value);
};

export const getNumberFieldInputMode = (step: number, formatOptions?: Intl.NumberFormatOptions) => {
  const hasFractionDigits =
    getFractionDigits(step) > 0 ||
    (formatOptions?.maximumFractionDigits ?? 0) > 0 ||
    (formatOptions?.minimumFractionDigits ?? 0) > 0;

  return hasFractionDigits ? "decimal" : "numeric";
};

export const isValueOutOfRange = (
  value: number | undefined,
  minValue?: number,
  maxValue?: number,
) => {
  if (value === undefined) {
    return false;
  }

  if (minValue !== undefined && value < minValue) {
    return true;
  }

  if (maxValue !== undefined && value > maxValue) {
    return true;
  }

  return false;
};

export const parseNumberValue = (text: string, formatOptions?: Intl.NumberFormatOptions) => {
  const trimmed = text.trim();

  if (!trimmed) {
    return undefined;
  }

  const {decimal, group, minusSign, percentSign} = getFormatterParts(formatOptions);
  const isAccountingNegative =
    trimmed.startsWith("(") && trimmed.endsWith(")") && !trimmed.includes(minusSign);

  let normalized = trimmed.replace(/[\s\u00A0\u202F]/g, "").replace(/[()]/g, "");

  if (group) {
    normalized = normalized.replace(new RegExp(escapeRegExp(group), "g"), "");
  }

  if (decimal !== FALLBACK_DECIMAL_SEPARATOR) {
    normalized = normalized.replace(
      new RegExp(escapeRegExp(decimal), "g"),
      FALLBACK_DECIMAL_SEPARATOR,
    );
  }

  if (minusSign !== FALLBACK_MINUS_SIGN) {
    normalized = normalized.replace(new RegExp(escapeRegExp(minusSign), "g"), FALLBACK_MINUS_SIGN);
  }

  if (percentSign) {
    normalized = normalized.replace(new RegExp(escapeRegExp(percentSign), "g"), "");
  }

  normalized = normalized.replace(/[^0-9.-]/g, "");

  const hasLeadingMinus = normalized.startsWith(FALLBACK_MINUS_SIGN) || isAccountingNegative;

  normalized = normalized.replace(/-/g, "");

  const [integerPart = "", ...fractionParts] = normalized.split(FALLBACK_DECIMAL_SEPARATOR);
  const fractionPart = fractionParts.join("");
  const normalizedNumber = `${hasLeadingMinus ? FALLBACK_MINUS_SIGN : ""}${integerPart}${
    fractionPart ? `.${fractionPart}` : ""
  }`;

  if (
    normalizedNumber === FALLBACK_MINUS_SIGN ||
    normalizedNumber === FALLBACK_DECIMAL_SEPARATOR ||
    normalizedNumber === "-."
  ) {
    return undefined;
  }

  const parsed = Number.parseFloat(normalizedNumber);

  if (Number.isNaN(parsed)) {
    return undefined;
  }

  if (formatOptions?.style === "percent") {
    return parsed / 100;
  }

  return parsed;
};

export const stepNumberValue = (
  currentValue: number | undefined,
  delta: number,
  step: number,
  minValue?: number,
  maxValue?: number,
) => {
  const normalizedStep = Number.isFinite(step) && step > 0 ? step : 1;
  const precision = Math.max(
    getFractionDigits(normalizedStep),
    getFractionDigits(currentValue ?? 0),
    getFractionDigits(minValue ?? 0),
    getFractionDigits(maxValue ?? 0),
  );
  const anchor = currentValue ?? (delta > 0 ? (minValue ?? 0) : (maxValue ?? minValue ?? 0));
  const nextValue = roundToPrecision(anchor + normalizedStep * delta, precision);

  return clampNumberValue(nextValue, minValue, maxValue);
};
