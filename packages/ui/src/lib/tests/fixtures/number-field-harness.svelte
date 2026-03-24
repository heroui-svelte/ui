<script lang="ts">
  import {Description} from "../../components/description";
  import {FieldError} from "../../components/field-error";
  import {Label} from "../../components/label";
  import {
    NumberField,
    NumberFieldDecrementButton,
    NumberFieldGroup,
    NumberFieldIncrementButton,
    NumberFieldInput,
  } from "../../components/number-field";

  let {
    customIcons = false,
    defaultValue = 12.5,
    maxValue = 20,
    minValue = 10,
    onChange,
    onValueChange,
    step = 0.5,
  }: {
    customIcons?: boolean;
    defaultValue?: number;
    maxValue?: number;
    minValue?: number;
    onChange?: (value: number | undefined) => void;
    onValueChange?: (value: number | undefined) => void;
    step?: number;
  } = $props();
</script>

<NumberField
  {defaultValue}
  fullWidth={true}
  isInvalid={true}
  {maxValue}
  {minValue}
  name="width"
  {onChange}
  {onValueChange}
  {step}
  variant="secondary"
>
  <Label>Width</Label>
  <Description>Enter the width in pixels.</Description>
  <FieldError>Width must stay within range.</FieldError>
  <NumberFieldGroup>
    {#if customIcons}
      <NumberFieldDecrementButton>
        <span data-testid="custom-decrement">-</span>
      </NumberFieldDecrementButton>
    {:else}
      <NumberFieldDecrementButton />
    {/if}
    <NumberFieldInput class="w-[120px]" />
    {#if customIcons}
      <NumberFieldIncrementButton>
        <span data-testid="custom-increment">+</span>
      </NumberFieldIncrementButton>
    {:else}
      <NumberFieldIncrementButton />
    {/if}
  </NumberFieldGroup>
</NumberField>
