<script lang="ts">
  import type {HeroColor} from "../../internal/color";

  import {
    ColorSwatchPicker,
    ColorSwatchPickerIndicator,
    ColorSwatchPickerItem,
    ColorSwatchPickerSwatch,
  } from "../../components/color-swatch-picker";

  const presets = ["#F43F5E", "#10B981", "#3B82F6"];
  let value = $state("#F43F5E");

  const updateValue = (color: HeroColor) => {
    value = color.toString("hex");
  };
</script>

<ColorSwatchPicker onChange={updateValue} value={value}>
  {#each presets as preset}
    <ColorSwatchPickerItem color={preset} data-testid={`swatch-item-${preset}`}>
      <ColorSwatchPickerSwatch />
      <ColorSwatchPickerIndicator />
    </ColorSwatchPickerItem>
  {/each}
</ColorSwatchPicker>

<p data-testid="selected-swatch">{value}</p>
