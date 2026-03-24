<script lang="ts">
  import type {HeroColor} from "../../internal/color";

  import {Label} from "../../components/label";
  import {
    ColorSlider,
    ColorSliderOutput,
    ColorSliderThumb,
    ColorSliderTrack,
  } from "../../components/color-slider";

  let value = $state("hsla(200, 85%, 48%, 0.8)");

  const updateValue = (color: HeroColor) => {
    value = color.toString("hsl");
  };
</script>

<ColorSlider channel="hue" colorSpace="hsb" onChange={updateValue} value={value}>
  <Label>Hue</Label>
  <ColorSliderOutput />
  <ColorSliderTrack aria-label="Hue slider" data-testid="color-slider-track">
    <ColorSliderThumb />
  </ColorSliderTrack>
</ColorSlider>

<p data-testid="slider-value">{value}</p>
