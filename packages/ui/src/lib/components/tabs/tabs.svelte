<script lang="ts">
  import type {Snippet} from "svelte";

  import {Tabs as BitsTabs} from "bits-ui";

  import {tabsVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setTabsContext} from "./context";

  let {
    children,
    class: className = "",
    activationMode = "automatic",
    defaultSelectedKey,
    isDisabled = false,
    loop = true,
    onSelectionChange,
    orientation = "horizontal",
    selectedKey,
    variant,
    ...restProps
  }: {
    activationMode?: "automatic" | "manual";
    children?: Snippet;
    class?: string;
    defaultSelectedKey?: string | number;
    isDisabled?: boolean;
    loop?: boolean;
    onSelectionChange?: (key: string) => void;
    orientation?: "horizontal" | "vertical";
    selectedKey?: string | number;
    variant?: "primary" | "secondary";
    [key: string]: any;
  } = $props();

  const getDefaultSelectedKey = () =>
    defaultSelectedKey === undefined ? "" : String(defaultSelectedKey);
  let uncontrolledKey = $state(getDefaultSelectedKey());

  const slots = $derived.by(() =>
    normalizeVariantResult(
      tabsVariants({
        variant,
      }),
      "tabs",
    ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "tabs");
  const currentValue = $derived(
    selectedKey === undefined ? uncontrolledKey : String(selectedKey),
  );

  const handleValueChange = (nextValue: string) => {
    if (selectedKey === undefined) {
      uncontrolledKey = nextValue;
    }

    onSelectionChange?.(nextValue);
  };

  setTabsContext({
    get orientation() {
      return orientation;
    },
    get slots() {
      return slots;
    },
  });
</script>

<BitsTabs.Root
  activationMode={activationMode}
  class={cn(rootClass, className)}
  data-slot="tabs"
  disabled={isDisabled}
  loop={loop}
  onValueChange={handleValueChange}
  orientation={orientation}
  value={currentValue}
  {...restProps}
>
  {@render children?.()}
</BitsTabs.Root>
