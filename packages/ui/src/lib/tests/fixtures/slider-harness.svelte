<script lang="ts">
  import {
    Slider,
    SliderFill,
    SliderMarks,
    SliderOutput,
    SliderThumb,
    SliderTrack,
  } from "../../components/slider";

  let {
    defaultValue = 30,
    onValueChange,
  }: {
    defaultValue?: number | number[];
    onValueChange?: (value: number | number[]) => void;
  } = $props();

  const thumbIndexes = $derived.by(() => {
    if (!Array.isArray(defaultValue)) {
      return [0];
    }

    return defaultValue.map((_, index) => index);
  });
</script>

<Slider defaultValue={defaultValue} maxValue={100} minValue={0} onValueChange={onValueChange} step={5}>
  <SliderOutput />
  <SliderTrack>
    <SliderFill />
    {#each thumbIndexes as index (index)}
      <SliderThumb {index} />
    {/each}
  </SliderTrack>
  <SliderMarks />
</Slider>
