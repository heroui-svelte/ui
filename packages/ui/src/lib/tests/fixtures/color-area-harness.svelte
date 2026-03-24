<script lang="ts">
  import type {HeroColor} from "../../internal/color";

  import {ColorArea, ColorAreaThumb} from "../../components/color-area";

  let value = $state("hsl(200, 70%, 45%)");

  const updateValue = (color: HeroColor) => {
    value = color.toString("hsl");
  };
</script>

<ColorArea
  aria-label="Color area"
  colorSpace="hsb"
  onChange={updateValue}
  value={value}
  xChannel="saturation"
  yChannel="brightness"
>
  <ColorAreaThumb data-testid="area-thumb" />
</ColorArea>

<p data-testid="area-value">{value}</p>
