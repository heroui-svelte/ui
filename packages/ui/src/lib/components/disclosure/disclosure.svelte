<script module lang="ts">
  let disclosureInstanceCount = 0;
</script>

<script lang="ts">
  import type {Snippet} from "svelte";

  import {disclosureVariants} from "@heroui-svelte/styles";

  import {getDisclosureGroupContext} from "../disclosure-group/context";
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setDisclosureContext} from "./context";

  let {
    children,
    class: className = "",
    defaultExpanded,
    defaultOpen,
    id,
    isDisabled = false,
    isExpanded,
    onExpandedChange,
    onOpenChange,
    open,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    defaultExpanded?: boolean;
    defaultOpen?: boolean;
    id?: string | number;
    isDisabled?: boolean;
    isExpanded?: boolean;
    onExpandedChange?: (isExpanded: boolean) => void;
    onOpenChange?: (isExpanded: boolean) => void;
    open?: boolean;
    [key: string]: any;
  } = $props();

  const groupContext = safeGetContext(getDisclosureGroupContext);
  const instanceId = `disclosure-${++disclosureInstanceCount}`;
  const getDefaultExpanded = () => defaultExpanded ?? defaultOpen ?? false;

  let uncontrolledExpanded = $state(getDefaultExpanded());

  const slots = $derived.by(() => normalizeVariantResult(disclosureVariants(), "disclosure"));
  const rootClass = $derived(slots.base?.({}) ?? "disclosure");
  const resolvedId = $derived(String(id ?? instanceId));
  const groupManaged = $derived(Boolean(groupContext?.toggleKey && id !== undefined));
  const controlledExpanded = $derived(isExpanded ?? open);
  const currentExpanded = $derived(
    groupManaged
      ? Boolean(groupContext?.expandedKeys?.includes(resolvedId))
      : controlledExpanded !== undefined
        ? Boolean(controlledExpanded)
        : uncontrolledExpanded,
  );
  const currentDisabled = $derived(Boolean(groupContext?.isDisabled || isDisabled));
  const triggerId = $derived(`${resolvedId}-trigger`);
  const contentId = $derived(`${resolvedId}-content`);
  const emitExpandedChange = (nextExpanded: boolean) => {
    onExpandedChange?.(nextExpanded);
    onOpenChange?.(nextExpanded);
  };

  const setExpanded = (nextExpanded: boolean) => {
    if (groupManaged) {
      groupContext?.toggleKey?.(resolvedId, nextExpanded);
      emitExpandedChange(nextExpanded);

      return;
    }

    if (controlledExpanded === undefined) {
      uncontrolledExpanded = nextExpanded;
    }

    emitExpandedChange(nextExpanded);
  };

  const toggle = () => {
    setExpanded(!currentExpanded);
  };

  setDisclosureContext({
    get contentId() {
      return contentId;
    },
    get isDisabled() {
      return currentDisabled;
    },
    get isExpanded() {
      return currentExpanded;
    },
    get slots() {
      return slots;
    },
    toggle,
    get triggerId() {
      return triggerId;
    },
  });
</script>

<div
  class={cn(rootClass, className)}
  data-disabled={withDataState(currentDisabled)}
  data-expanded={withDataState(currentExpanded)}
  data-slot="disclosure"
  id={id === undefined ? undefined : String(id)}
  {...restProps}
>
  {@render children?.()}
</div>
