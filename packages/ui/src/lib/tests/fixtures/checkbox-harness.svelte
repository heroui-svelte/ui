<script lang="ts">
  import {CheckboxGroup} from "../../components/checkbox-group";
  import {
    Checkbox,
    CheckboxContent,
    CheckboxControl,
    CheckboxIndicator,
  } from "../../components/checkbox";

  let {
    onGroupChange,
    onStandaloneChange,
  }: {
    onGroupChange?: (value: string[]) => void;
    onStandaloneChange?: (checked: boolean) => void;
  } = $props();
</script>

<div class="flex flex-col gap-6">
  <Checkbox aria-label="Standalone" onChange={onStandaloneChange}>
    <CheckboxControl>
      <CheckboxIndicator />
    </CheckboxControl>
    <CheckboxContent>Standalone</CheckboxContent>
  </Checkbox>

  <Checkbox aria-label="Partially selected" isIndeterminate>
    <CheckboxControl>
      <CheckboxIndicator />
    </CheckboxControl>
    <CheckboxContent>Partially selected</CheckboxContent>
  </Checkbox>

  <CheckboxGroup
    defaultValue={["design"]}
    name="interests"
    onChange={onGroupChange}
    variant="secondary"
  >
    <Checkbox aria-label="Coding" value="coding">
      <CheckboxControl>
        <CheckboxIndicator />
      </CheckboxControl>
      <CheckboxContent>Coding</CheckboxContent>
    </Checkbox>
    <Checkbox aria-label="Design" value="design">
      <CheckboxControl>
        <CheckboxIndicator />
      </CheckboxControl>
      <CheckboxContent>Design</CheckboxContent>
    </Checkbox>
  </CheckboxGroup>
</div>
