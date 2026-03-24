<script lang="ts">
  import type {Snippet} from "svelte";

  import {fieldErrorVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult} from "../../internal/slots";
  import {getSearchFieldContext} from "../search-field/context";
  import {getTextFieldContext} from "../textfield/context";

  let {
    children,
    class: className = "",
    id,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    id?: string;
    [key: string]: any;
  } = $props();

  const textFieldContext = safeGetContext(getTextFieldContext);
  const searchFieldContext = safeGetContext(getSearchFieldContext);
  const fieldContext = $derived(textFieldContext ?? searchFieldContext);
  const resolvedId = $derived(id ?? fieldContext?.errorMessageId);

  const slots = $derived.by(
    () => normalizeVariantResult(fieldErrorVariants(), "field-error"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "field-error");

  $effect(() => {
    if (!fieldContext) {
      return;
    }

    textFieldContext?.setHasErrorMessage?.(true);
    searchFieldContext?.setHasError?.(true);

    return () => {
      textFieldContext?.setHasErrorMessage?.(false);
      searchFieldContext?.setHasError?.(false);
    };
  });
</script>

<div class={cn(rootClass, className)} data-slot="field-error" data-visible id={resolvedId} {...restProps}>
  {@render children?.()}
</div>
