<script lang="ts">
  import type {Snippet} from "svelte";

  import {labelVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getSearchFieldContext} from "../search-field/context";
  import {getTextFieldContext} from "../textfield/context";

  let {
    for: htmlForProp,
    children,
    class: className = "",
    htmlFor,
    isDisabled = false,
    isInvalid = false,
    isRequired = false,
    ...restProps
  }: {
    for?: string;
    children?: Snippet;
    class?: string;
    htmlFor?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isRequired?: boolean;
    [key: string]: any;
  } = $props();

  const textFieldContext = safeGetContext(getTextFieldContext);
  const searchFieldContext = safeGetContext(getSearchFieldContext);
  const fieldContext = $derived(textFieldContext ?? searchFieldContext);
  const effectiveDisabled = $derived(Boolean(isDisabled || fieldContext?.isDisabled));
  const effectiveInvalid = $derived(Boolean(isInvalid || fieldContext?.isInvalid));
  const effectiveRequired = $derived(Boolean(isRequired || fieldContext?.isRequired));
  const resolvedFor = $derived(
    htmlForProp ?? htmlFor ?? fieldContext?.inputId,
  );

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        labelVariants({
          isDisabled: effectiveDisabled,
          isInvalid: effectiveInvalid,
          isRequired: effectiveRequired,
        }),
        "label",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "label");
</script>

<label
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-invalid={withDataState(effectiveInvalid)}
  data-required={withDataState(effectiveRequired)}
  data-slot="label"
  for={resolvedFor}
  {...restProps}
>
  {@render children?.()}
</label>
