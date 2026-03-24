<script lang="ts">
  import {RadioGroup} from "../../components/radio-group";
  import {Radio, RadioContent, RadioControl, RadioIndicator} from "../../components/radio";

  let {
    onChange,
  }: {
    onChange?: (value: string) => void;
  } = $props();
</script>

<RadioGroup
  defaultValue="pro"
  name="plans"
  onChange={onChange}
  orientation="horizontal"
  variant="secondary"
>
  <Radio value="starter">
    <RadioControl>
      <RadioIndicator />
    </RadioControl>
    <RadioContent>Starter</RadioContent>
  </Radio>
  <Radio value="pro">
    <RadioControl>
      <RadioIndicator />
    </RadioControl>
    <RadioContent>Pro</RadioContent>
  </Radio>
</RadioGroup>
