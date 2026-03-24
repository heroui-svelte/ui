<script lang="ts">
  import {SwitchGroup} from "../../components/switch-group";
  import {Switch, SwitchContent, SwitchControl, SwitchThumb} from "../../components/switch";

  let {
    onChange,
  }: {
    onChange?: (checked: boolean) => void;
  } = $props();
</script>

<div class="flex flex-col gap-6">
  <Switch aria-label="Notifications" onChange={onChange} size="lg">
    <SwitchControl>
      <SwitchThumb />
    </SwitchControl>
    <SwitchContent>Notifications</SwitchContent>
  </Switch>

  <SwitchGroup orientation="horizontal">
    <Switch aria-label="Marketing">
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchContent>Marketing</SwitchContent>
    </Switch>
    <Switch aria-label="Product">
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
      <SwitchContent>Product</SwitchContent>
    </Switch>
  </SwitchGroup>
</div>
