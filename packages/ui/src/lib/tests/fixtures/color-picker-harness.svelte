<script lang="ts">
  import type {HeroColor} from "../../internal/color";

  import {ColorArea, ColorAreaThumb} from "../../components/color-area";
  import {
    ColorPicker,
    ColorPickerPopover,
    ColorPickerTrigger,
  } from "../../components/color-picker";
  import {ColorSwatch} from "../../components/color-swatch";
  import {
    ColorSwatchPicker,
    ColorSwatchPickerIndicator,
    ColorSwatchPickerItem,
    ColorSwatchPickerSwatch,
  } from "../../components/color-swatch-picker";
  import {Label} from "../../components/label";

  const presets = ["#F43F5E", "#10B981", "#3B82F6"];
  let value = $state("#325578");

  const updateValue = (color: HeroColor) => {
    value = color.toString("hex");
  };
</script>

<ColorPicker onChange={updateValue} value={value}>
  <ColorPickerTrigger aria-label="Open color picker">
    <ColorSwatch size="lg" />
    <Label>Pick a color</Label>
  </ColorPickerTrigger>
  <ColorPickerPopover>
    <ColorArea
      aria-label="Color area"
      class="max-w-full"
      colorSpace="hsb"
      xChannel="saturation"
      yChannel="brightness"
    >
      <ColorAreaThumb data-testid="picker-area-thumb" />
    </ColorArea>
    <ColorSwatchPicker>
      {#each presets as preset}
        <ColorSwatchPickerItem color={preset} data-testid={`picker-item-${preset}`}>
          <ColorSwatchPickerSwatch />
          <ColorSwatchPickerIndicator />
        </ColorSwatchPickerItem>
      {/each}
    </ColorSwatchPicker>
  </ColorPickerPopover>
</ColorPicker>

<p data-testid="picker-value">{value}</p>
