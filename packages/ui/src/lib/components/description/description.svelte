<script lang="ts">
  import type {Snippet} from "svelte";

  import {descriptionVariants} from "@heroui-svelte/styles";

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
  const resolvedId = $derived(id ?? fieldContext?.descriptionId);

  const slots = $derived.by(
    () => normalizeVariantResult(descriptionVariants(), "description"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "description");

  $effect(() => {
    if (!fieldContext?.setHasDescription) {
      return;
    }

    fieldContext.setHasDescription(true);

    return () => {
      fieldContext.setHasDescription?.(false);
    };
  });
</script>

<p class={cn(rootClass, className)} data-slot="description" id={resolvedId} {...restProps}>
  {@render children?.()}
</p>
