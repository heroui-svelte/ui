<script lang="ts">
  import type {HeroColor} from "../../internal/color";

  import {Description} from "../../components/description";
  import {
    ColorField,
    ColorFieldGroup,
    ColorFieldInput,
    ColorFieldPrefix,
    ColorFieldSuffix,
  } from "../../components/color-field";
  import {ColorSwatch} from "../../components/color-swatch";
  import {Label} from "../../components/label";

  let value = $state("#0485F7");

  const updateValue = (color: HeroColor) => {
    value = color.toString("hex");
  };
</script>

<ColorField onChange={updateValue} value={value}>
  <Label>Color</Label>
  <ColorFieldGroup>
    <ColorFieldPrefix>
      <ColorSwatch size="xs" />
    </ColorFieldPrefix>
    <ColorFieldInput />
    <ColorFieldSuffix>
      <span>hex</span>
    </ColorFieldSuffix>
  </ColorFieldGroup>
  <Description data-testid="field-value">{value}</Description>
</ColorField>
