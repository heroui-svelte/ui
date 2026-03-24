<script lang="ts">
  import type {Snippet} from "svelte";

  import type {AvatarVariants} from "@heroui-svelte/styles";

  import {avatarVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {normalizeVariantResult} from "../../internal/slots";
  import {setAvatarContext} from "./context";

  let {
    children,
    class: className = "",
    color,
    size,
    variant,
    ...restProps
  }: {
    children?: Snippet;
    class?: string;
    color?: AvatarVariants["color"];
    size?: AvatarVariants["size"];
    variant?: AvatarVariants["variant"];
    [key: string]: any;
  } = $props();

  let hasImage = $state(false);
  let imageFailed = $state(false);
  let imageLoaded = $state(false);

  const slots = $derived.by(
    () => normalizeVariantResult(avatarVariants({color, size, variant}), "avatar"),
  );
  const rootClass = $derived(slots.base?.({}) ?? "avatar");

  const setHasImage = (nextHasImage: boolean) => {
    hasImage = nextHasImage;

    if (!nextHasImage) {
      imageFailed = false;
      imageLoaded = false;
    }
  };

  const setImageFailed = (failed: boolean) => {
    imageFailed = failed;

    if (failed) {
      imageLoaded = false;
    }
  };

  const setImageLoaded = (loaded: boolean) => {
    imageLoaded = loaded;

    if (loaded) {
      imageFailed = false;
    }
  };

  setAvatarContext({
    get hasImage() {
      return hasImage;
    },
    get imageFailed() {
      return imageFailed;
    },
    get imageLoaded() {
      return imageLoaded;
    },
    setHasImage,
    setImageFailed,
    setImageLoaded,
    get slots() {
      return slots;
    },
  });
</script>

<div class={cn(rootClass, className)} data-slot="avatar" {...restProps}>
  {@render children?.()}
</div>
