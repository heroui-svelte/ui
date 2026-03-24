<script lang="ts">
  import {separatorVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult} from "../../internal/slots";
  import {getToolbarContext} from "../toolbar/context";

  let {
    class: className = "",
    orientation,
    variant,
    ...restProps
  }: {
    class?: string;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "secondary" | "tertiary";
    [key: string]: any;
  } = $props();

  const toolbarContext = safeGetContext(getToolbarContext);
  const resolvedOrientation = $derived(
    orientation ??
      (toolbarContext?.orientation === "horizontal" ? "vertical" : "horizontal"),
  );
  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        separatorVariants({
          orientation: resolvedOrientation,
          variant,
        }),
        "separator",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "separator");
</script>

<hr
  class={cn(rootClass, className)}
  data-orientation={resolvedOrientation}
  data-slot="separator"
  {...restProps}
 />
