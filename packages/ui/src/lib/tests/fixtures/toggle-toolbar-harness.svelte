<script lang="ts">
  import {Separator} from "../../components/separator";
  import {ToggleButton} from "../../components/toggle-button";
  import {ToggleButtonGroup, ToggleButtonGroupSeparator} from "../../components/toggle-button-group";
  import {Toolbar} from "../../components/toolbar";

  let {
    onGroupChange,
    onStandaloneChange,
  }: {
    onGroupChange?: (keys: Set<string>) => void;
    onStandaloneChange?: (selected: boolean) => void;
  } = $props();
</script>

<Toolbar aria-label="Formatting toolbar" isAttached orientation="vertical">
  <ToggleButtonGroup
    aria-label="Text style"
    onSelectionChange={onGroupChange}
    selectionMode="multiple"
    size="sm"
  >
    <ToggleButton aria-label="Bold" isIconOnly value="bold">B</ToggleButton>
    <ToggleButton aria-label="Italic" isIconOnly value="italic">
      <ToggleButtonGroupSeparator />
      I
    </ToggleButton>
  </ToggleButtonGroup>
  <Separator />
</Toolbar>

<ToggleButton defaultSelected onChange={onStandaloneChange} variant="ghost">
  Like
</ToggleButton>
