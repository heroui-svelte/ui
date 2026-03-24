<script lang="ts">
  import {onMount} from "svelte";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getAvatarContext} from "./context";

  let {
    class: className = "",
    onerror,
    onload,
    src,
    ...restProps
  }: {
    class?: string;
    onerror?: (event: Event) => void;
    onload?: (event: Event) => void;
    src?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getAvatarContext);
  const slotClass = $derived(context?.slots?.image?.({}) ?? "avatar__image");
  let isVisible = $state(false);

  onMount(() => {
    if (src) {
      context?.setHasImage?.(true);
      context?.setImageFailed?.(false);
      context?.setImageLoaded?.(false);
    }

    return () => {
      context?.setHasImage?.(false);
      context?.setImageFailed?.(false);
      context?.setImageLoaded?.(false);
    };
  });

  const handleLoad = (event: Event) => {
    isVisible = true;
    context?.setImageLoaded?.(true);
    onload?.(event);
  };

  const handleError = (event: Event) => {
    isVisible = false;
    context?.setImageFailed?.(true);
    onerror?.(event);
  };
</script>

<img
  class={cn(slotClass, className)}
  data-loaded={isVisible ? "true" : undefined}
  data-slot="avatar-image"
  hidden={!isVisible}
  onerror={handleError}
  onload={handleLoad}
  {src}
  {...restProps}
/>
