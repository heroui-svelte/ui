<script lang="ts">
  import type {Snippet} from "svelte";

  import type {ToolbarVariants} from "@heroui-svelte/styles";

  import {Toolbar as BitsToolbar} from "bits-ui";
  import {toolbarVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setToolbarContext} from "./context";

  let {
    children,
    class: className = "",
    isAttached = false,
    loop = true,
    orientation = "horizontal",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    isAttached?: ToolbarVariants["isAttached"];
    loop?: boolean;
    orientation?: ToolbarVariants["orientation"];
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        toolbarVariants({
          isAttached,
          orientation,
        }),
        "toolbar",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "toolbar");

  setToolbarContext({
    get orientation() {
      return orientation;
    },
  });
</script>

<BitsToolbar.Root
  class={cn(rootClass, className)}
  data-slot="toolbar"
  {loop}
  {orientation}
  {...restProps}
>
  {@render children?.()}
</BitsToolbar.Root>
