export type ColorSpace = "hsb" | "hsl" | "rgb";
export type ColorChannel =
  | "alpha"
  | "blue"
  | "brightness"
  | "green"
  | "hue"
  | "lightness"
  | "red"
  | "saturation";
export type ColorFormat = "css" | "hex" | "hsb" | "hsl" | "rgb";
export type ColorInputValue = HeroColor | string | null | undefined;
export type ColorChannelRange = {
  maxValue: number;
  minValue: number;
};

type HslColor = {
  h: number;
  l: number;
  s: number;
};

type HsvColor = {
  h: number;
  s: number;
  v: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const round = (value: number, decimals = 0) => {
  const factor = 10 ** decimals;

  return Math.round(value * factor) / factor;
};

const toHex = (value: number) =>
  clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0").toUpperCase();

const hueToRgb = (p: number, q: number, t: number) => {
  let nextT = t;

  if (nextT < 0) {
    nextT += 1;
  }

  if (nextT > 1) {
    nextT -= 1;
  }

  if (nextT < 1 / 6) {
    return p + (q - p) * 6 * nextT;
  }

  if (nextT < 1 / 2) {
    return q;
  }

  if (nextT < 2 / 3) {
    return p + (q - p) * (2 / 3 - nextT) * 6;
  }

  return p;
};

const rgbToHsl = (r: number, g: number, b: number): HslColor => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const lightness = (max + min) / 2;

  let hue = 0;
  let saturation = 0;

  if (delta !== 0) {
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / delta + 2;
        break;
      default:
        hue = (red - green) / delta + 4;
        break;
    }

    hue *= 60;
  }

  return {
    h: round(hue, 2),
    l: round(lightness * 100, 2),
    s: round(saturation * 100, 2),
  };
};

const hslToRgb = (h: number, s: number, l: number) => {
  const hue = (((h % 360) + 360) % 360) / 360;
  const saturation = clamp(s, 0, 100) / 100;
  const lightness = clamp(l, 0, 100) / 100;

  if (saturation === 0) {
    const gray = Math.round(lightness * 255);

    return {b: gray, g: gray, r: gray};
  }

  const q =
    lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;

  return {
    b: Math.round(hueToRgb(p, q, hue - 1 / 3) * 255),
    g: Math.round(hueToRgb(p, q, hue) * 255),
    r: Math.round(hueToRgb(p, q, hue + 1 / 3) * 255),
  };
};

const rgbToHsv = (r: number, g: number, b: number): HsvColor => {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;

  let hue = 0;

  if (delta !== 0) {
    switch (max) {
      case red:
        hue = ((green - blue) / delta + (green < blue ? 6 : 0)) * 60;
        break;
      case green:
        hue = ((blue - red) / delta + 2) * 60;
        break;
      default:
        hue = ((red - green) / delta + 4) * 60;
        break;
    }
  }

  return {
    h: round(hue, 2),
    s: round((max === 0 ? 0 : delta / max) * 100, 2),
    v: round(max * 100, 2),
  };
};

const hsvToRgb = (h: number, s: number, v: number) => {
  const hue = ((h % 360) + 360) % 360;
  const saturation = clamp(s, 0, 100) / 100;
  const brightness = clamp(v, 0, 100) / 100;
  const chroma = brightness * saturation;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const match = brightness - chroma;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (hue < 60) {
    red = chroma;
    green = x;
  } else if (hue < 120) {
    red = x;
    green = chroma;
  } else if (hue < 180) {
    green = chroma;
    blue = x;
  } else if (hue < 240) {
    green = x;
    blue = chroma;
  } else if (hue < 300) {
    red = x;
    blue = chroma;
  } else {
    red = chroma;
    blue = x;
  }

  return {
    b: Math.round((blue + match) * 255),
    g: Math.round((green + match) * 255),
    r: Math.round((red + match) * 255),
  };
};

const parseHexColor = (input: string) => {
  const normalized = input.replace("#", "").trim();

  if (![3, 4, 6, 8].includes(normalized.length)) {
    return null;
  }

  const expanded =
    normalized.length === 3 || normalized.length === 4
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const red = Number.parseInt(expanded.slice(0, 2), 16);
  const green = Number.parseInt(expanded.slice(2, 4), 16);
  const blue = Number.parseInt(expanded.slice(4, 6), 16);
  const alpha = expanded.length === 8 ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1;

  if ([red, green, blue, alpha].some(Number.isNaN)) {
    return null;
  }

  return new HeroColor(red, green, blue, alpha);
};

const parseRgbColor = (input: string) => {
  const match = input.match(
    /^rgba?\(\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)(?:\s*,\s*(-?\d*\.?\d+)\s*)?\)$/i,
  );

  if (!match) {
    return null;
  }

  const [, red, green, blue, alpha] = match;

  return new HeroColor(
    Number(red),
    Number(green),
    Number(blue),
    alpha === undefined ? 1 : Number(alpha),
  );
};

const parseHslColor = (input: string) => {
  const match = input.match(
    /^hsla?\(\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)%\s*,\s*(-?\d*\.?\d+)%(?:\s*,\s*(-?\d*\.?\d+)\s*)?\)$/i,
  );

  if (!match) {
    return null;
  }

  const [, hue, saturation, lightness, alpha] = match;
  const rgb = hslToRgb(Number(hue), Number(saturation), Number(lightness));

  return new HeroColor(rgb.r, rgb.g, rgb.b, alpha === undefined ? 1 : Number(alpha));
};

export class HeroColor {
  a: number;
  b: number;
  g: number;
  r: number;

  constructor(r: number, g: number, b: number, a = 1) {
    this.r = clamp(Math.round(r), 0, 255);
    this.g = clamp(Math.round(g), 0, 255);
    this.b = clamp(Math.round(b), 0, 255);
    this.a = clamp(a, 0, 1);
  }

  clone() {
    return new HeroColor(this.r, this.g, this.b, this.a);
  }

  equals(other: ColorInputValue) {
    const next = parseColor(other);

    if (!next) {
      return false;
    }

    return (
      this.r === next.r &&
      this.g === next.g &&
      this.b === next.b &&
      round(this.a, 4) === round(next.a, 4)
    );
  }

  getChannelRange(channel: ColorChannel): ColorChannelRange {
    return getColorChannelRange(channel);
  }

  getChannelValue(channel: ColorChannel, colorSpace?: ColorSpace) {
    const hsl = rgbToHsl(this.r, this.g, this.b);
    const hsv = rgbToHsv(this.r, this.g, this.b);
    const resolvedColorSpace = colorSpace ?? getDefaultColorSpace(channel);

    switch (channel) {
      case "red":
        return this.r;
      case "green":
        return this.g;
      case "blue":
        return this.b;
      case "alpha":
        return round(this.a * 100, 2);
      case "brightness":
        return hsv.v;
      case "lightness":
        return hsl.l;
      case "hue":
        return resolvedColorSpace === "hsb" ? hsv.h : hsl.h;
      case "saturation":
        return resolvedColorSpace === "hsb" ? hsv.s : hsl.s;
      default:
        return 0;
    }
  }

  toString(format: ColorFormat = "css") {
    const hsl = rgbToHsl(this.r, this.g, this.b);
    const hsv = rgbToHsv(this.r, this.g, this.b);
    const alpha = round(this.a, 3);

    switch (format) {
      case "hex":
        return `${`#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`}${this.a < 1 ? toHex(this.a * 255) : ""}`;
      case "hsl":
        return this.a < 1
          ? `hsla(${round(hsl.h)}, ${round(hsl.s)}%, ${round(hsl.l)}%, ${alpha})`
          : `hsl(${round(hsl.h)}, ${round(hsl.s)}%, ${round(hsl.l)}%)`;
      case "hsb":
        return `hsb(${round(hsv.h)}, ${round(hsv.s)}%, ${round(hsv.v)}%${this.a < 1 ? `, ${alpha}` : ""})`;
      case "rgb":
      case "css":
      default:
        return this.a < 1
          ? `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`
          : `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
  }

  withChannelValue(channel: ColorChannel, value: number, colorSpace?: ColorSpace) {
    const range = getColorChannelRange(channel);
    const nextValue = clamp(value, range.minValue, range.maxValue);
    const resolvedColorSpace = colorSpace ?? getDefaultColorSpace(channel);

    if (channel === "alpha") {
      return new HeroColor(this.r, this.g, this.b, nextValue / 100);
    }

    if (channel === "red" || channel === "green" || channel === "blue") {
      return new HeroColor(
        channel === "red" ? nextValue : this.r,
        channel === "green" ? nextValue : this.g,
        channel === "blue" ? nextValue : this.b,
        this.a,
      );
    }

    if (resolvedColorSpace === "hsb") {
      const hsv = rgbToHsv(this.r, this.g, this.b);

      return HeroColor.fromHsv(
        channel === "hue" ? nextValue : hsv.h,
        channel === "saturation" ? nextValue : hsv.s,
        channel === "brightness" ? nextValue : hsv.v,
        this.a,
      );
    }

    const hsl = rgbToHsl(this.r, this.g, this.b);

    return HeroColor.fromHsl(
      channel === "hue" ? nextValue : hsl.h,
      channel === "saturation" ? nextValue : hsl.s,
      channel === "lightness" ? nextValue : hsl.l,
      this.a,
    );
  }

  static fromHsl(h: number, s: number, l: number, a = 1) {
    const rgb = hslToRgb(h, s, l);

    return new HeroColor(rgb.r, rgb.g, rgb.b, a);
  }

  static fromHsv(h: number, s: number, v: number, a = 1) {
    const rgb = hsvToRgb(h, s, v);

    return new HeroColor(rgb.r, rgb.g, rgb.b, a);
  }
}

export const getColorChannelRange = (channel: ColorChannel): ColorChannelRange => {
  switch (channel) {
    case "hue":
      return {maxValue: 360, minValue: 0};
    case "red":
    case "green":
    case "blue":
      return {maxValue: 255, minValue: 0};
    default:
      return {maxValue: 100, minValue: 0};
  }
};

export const getDefaultColorSpace = (channel?: ColorChannel): ColorSpace => {
  switch (channel) {
    case "red":
    case "green":
    case "blue":
      return "rgb";
    case "brightness":
      return "hsb";
    default:
      return "hsl";
  }
};

export const normalizeColorSpaceForChannel = (
  channel: ColorChannel,
  colorSpace?: ColorSpace,
  onInvalid?: (message: string) => void,
): ColorSpace | undefined => {
  const requiredColorSpace = {
    blue: "rgb",
    brightness: "hsb",
    green: "rgb",
    lightness: "hsl",
    red: "rgb",
  } as const satisfies Partial<Record<ColorChannel, ColorSpace>>;

  const nextColorSpace = colorSpace ?? getDefaultColorSpace(channel);
  const required = requiredColorSpace[channel];

  if (required && nextColorSpace !== required) {
    onInvalid?.(
      `[HeroUI Color] Invalid combination: channel="${channel}" requires colorSpace="${required}". Auto-correcting to "${required}".`,
    );

    return required;
  }

  if ((channel === "hue" || channel === "saturation") && nextColorSpace === "rgb") {
    onInvalid?.(
      `[HeroUI Color] Invalid combination: channel="${channel}" is not available in RGB color space. Auto-correcting to "hsl".`,
    );

    return "hsl";
  }

  return nextColorSpace;
};

export const parseColor = (value: ColorInputValue) => {
  if (value instanceof HeroColor) {
    return value.clone();
  }

  if (typeof value !== "string") {
    return null;
  }

  const input = value.trim();

  if (!input) {
    return null;
  }

  if (input.startsWith("#")) {
    return parseHexColor(input);
  }

  if (input.startsWith("rgb")) {
    return parseRgbColor(input);
  }

  if (input.startsWith("hsl")) {
    return parseHslColor(input);
  }

  return null;
};

export const resolveColor = (value: ColorInputValue, fallback: ColorInputValue = "#0485F7") =>
  parseColor(value) ?? parseColor(fallback) ?? new HeroColor(4, 133, 247, 1);

export const getColorLuminance = (value: ColorInputValue) => {
  const color = resolveColor(value);

  return (0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b) / 255;
};

export const formatColorFieldValue = (
  color: ColorInputValue,
  channel?: ColorChannel,
  colorSpace?: ColorSpace,
) => {
  const currentColor = resolveColor(color);

  if (!channel) {
    return currentColor.toString("hex");
  }

  const nextColorSpace = colorSpace ?? getDefaultColorSpace(channel);
  const valueForChannel = currentColor.getChannelValue(channel, nextColorSpace);

  return String(round(valueForChannel));
};

export const parseColorFieldInput = (
  input: string,
  currentColor: ColorInputValue,
  channel?: ColorChannel,
  colorSpace?: ColorSpace,
) => {
  if (!channel) {
    return parseColor(input);
  }

  const parsedValue = Number.parseFloat(input);

  if (Number.isNaN(parsedValue)) {
    return null;
  }

  return resolveColor(currentColor).withChannelValue(
    channel,
    parsedValue,
    colorSpace ?? getDefaultColorSpace(channel),
  );
};

export const getChannelValueLabel = (
  color: ColorInputValue,
  channel: ColorChannel,
  colorSpace?: ColorSpace,
) => {
  const currentColor = resolveColor(color);
  const nextColorSpace = colorSpace ?? getDefaultColorSpace(channel);
  const channelValue = round(currentColor.getChannelValue(channel, nextColorSpace));

  switch (channel) {
    case "alpha":
    case "brightness":
    case "lightness":
    case "saturation":
      return `${channelValue}%`;
    case "hue":
      return `${channelValue}\u00b0`;
    default:
      return String(channelValue);
  }
};

const getTrackColorAtValue = (
  color: HeroColor,
  channel: ColorChannel,
  value: number,
  colorSpace?: ColorSpace,
) =>
  color
    .withChannelValue(channel, value, colorSpace ?? getDefaultColorSpace(channel))
    .toString("css");

export const getSliderTrackBackground = (
  color: ColorInputValue,
  channel: ColorChannel,
  colorSpace?: ColorSpace,
  orientation: "horizontal" | "vertical" = "horizontal",
) => {
  const currentColor = resolveColor(color);
  const nextColorSpace = colorSpace ?? getDefaultColorSpace(channel);
  const direction = orientation === "vertical" ? "to top" : "to right";
  const range = getColorChannelRange(channel);

  if (channel === "hue") {
    return {
      background: `linear-gradient(${direction}, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0))`,
      end: getTrackColorAtValue(currentColor, channel, range.maxValue, nextColorSpace),
      start: getTrackColorAtValue(currentColor, channel, range.minValue, nextColorSpace),
    };
  }

  if (channel === "alpha") {
    const opaqueColor = new HeroColor(currentColor.r, currentColor.g, currentColor.b, 1).toString(
      "css",
    );

    return {
      background: `linear-gradient(${direction}, rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0), ${opaqueColor})`,
      end: opaqueColor,
      start: `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0)`,
    };
  }

  return {
    background: `linear-gradient(${direction}, ${getTrackColorAtValue(currentColor, channel, range.minValue, nextColorSpace)}, ${getTrackColorAtValue(currentColor, channel, range.maxValue, nextColorSpace)})`,
    end: getTrackColorAtValue(currentColor, channel, range.maxValue, nextColorSpace),
    start: getTrackColorAtValue(currentColor, channel, range.minValue, nextColorSpace),
  };
};

export const getColorAreaColorAt = (
  baseColor: ColorInputValue,
  xChannel: ColorChannel,
  yChannel: ColorChannel,
  xPercent: number,
  yPercent: number,
  colorSpace?: ColorSpace,
) => {
  const currentColor = resolveColor(baseColor);
  const xRange = getColorChannelRange(xChannel);
  const yRange = getColorChannelRange(yChannel);
  const resolvedColorSpace = colorSpace ?? getDefaultColorSpace(xChannel);
  const xValue = xRange.minValue + clamp(xPercent, 0, 1) * (xRange.maxValue - xRange.minValue);
  const yValue = yRange.minValue + clamp(yPercent, 0, 1) * (yRange.maxValue - yRange.minValue);

  return currentColor
    .withChannelValue(xChannel, xValue, resolvedColorSpace)
    .withChannelValue(yChannel, yValue, resolvedColorSpace);
};
