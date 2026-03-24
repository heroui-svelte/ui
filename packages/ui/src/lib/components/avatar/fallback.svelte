<script lang="ts">
  import type {Snippet} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAvatarContext} from "./context";

  let {
    children,
    class: className = "",
    delayMs = 0,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    delayMs?: number;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getAvatarContext);
  const slotClass = $derived(context?.slots?.fallback?.({}) ?? "avatar__fallback");

  let isDelayElapsed = $state(false);

  $effect(() => {
    const hasImage = context?.hasImage ?? false;
    const imageFailed = context?.imageFailed ?? false;
    const imageLoaded = context?.imageLoaded ?? false;

    isDelayElapsed = delayMs === 0 || !hasImage || imageLoaded || imageFailed;

    if (isDelayElapsed) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      isDelayElapsed = true;
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  });

  const shouldShow = $derived.by(() => {
    if (!context?.hasImage) {
      return true;
    }

    if (context.imageFailed) {
      return true;
    }

    if (context.imageLoaded) {
      return false;
    }

    return isDelayElapsed;
  });
</script>

<span
  aria-hidden={shouldShow ? undefined : "true"}
  class={cn(slotClass, className)}
  data-slot="avatar-fallback"
  hidden={!shouldShow}
  {...restProps}
>
  {@render children?.()}
</span>
