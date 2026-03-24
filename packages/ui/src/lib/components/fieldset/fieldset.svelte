<script lang="ts">
  import type {Snippet} from "svelte";

  import {fieldsetVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {setFieldsetContext} from "./context";

  let {
    children,
    class: className = "",
    disabled,
    isDisabled,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    disabled?: boolean;
    isDisabled?: boolean;
    [key: string]: any;
  } = $props();

  const slots = $derived.by(() => normalizeVariantResult(fieldsetVariants(), "fieldset"));
  const rootClass = $derived(slots.base?.({}) ?? "fieldset");
  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled));

  setFieldsetContext({
    get slots() {
      return slots;
    },
  });
</script>

<fieldset
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-slot="fieldset"
  disabled={effectiveDisabled}
  {...restProps}
>
  {@render children?.()}
</fieldset>
