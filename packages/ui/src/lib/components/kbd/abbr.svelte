<script lang="ts">
  import type {KbdKey} from "./kbd.constants";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getKbdContext} from "./context";
  import {kbdKeysLabelMap, kbdKeysMap} from "./kbd.constants";

  let {
    class: className = "",
    keyValue,
    ...restProps
  }: {
    class?: string;
    keyValue: KbdKey;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getKbdContext);
  const slotClass = $derived(context?.slots?.abbr?.({}) ?? "kbd__abbr");
</script>

<abbr
  class={cn(slotClass, className)}
  data-slot="kbd-abbr"
  title={kbdKeysLabelMap[keyValue]}
  {...restProps}
>
  {kbdKeysMap[keyValue]}
</abbr>
