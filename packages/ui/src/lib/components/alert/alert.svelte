<script lang="ts">
  import type {Snippet} from "svelte";

  import {alertVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setAlertContext} from "./context";

  let {
    children,
    class: className = "",
    status = "default",
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    status?: "default" | "accent" | "success" | "warning" | "danger";
    [key: string]: any;
  } = $props();

  const slots = $derived.by(
    () => normalizeVariantResult(alertVariants({status}), "alert"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "alert");

  setAlertContext({
    get slots() {
      return slots;
    },
    get status() {
      return status;
    },
  });
</script>

<div class={cn(rootClass, className)} data-slot="alert" {...restProps}>
  {@render children?.()}
</div>
