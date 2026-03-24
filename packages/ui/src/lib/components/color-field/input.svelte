<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {getColorFieldContext} from "./context";
  import {getColorFieldGroupContext} from "./group-context";

  let {
    class: className = "",
    oninput,
    placeholder,
    ...restProps
  }: {
    class?: string;
    oninput?: (event: Event) => void;
    placeholder?: string;
    [key: string]: any;
  } = $props();

  const fieldContext = safeGetContext(getColorFieldContext);
  const groupContext = safeGetContext(getColorFieldGroupContext);
  const slotClass = $derived(groupContext?.slots?.input?.({}) ?? "color-input-group__input");

  const handleInput = (event: Event) => {
    const target = event.currentTarget as HTMLInputElement;

    fieldContext?.setInputValue?.(target.value);
    oninput?.(event);
  };
</script>

<input
  aria-describedby={groupContext?.describedBy}
  aria-invalid={groupContext?.isInvalid ? "true" : undefined}
  class={cn(slotClass, className)}
  data-slot="color-input-group-input"
  disabled={groupContext?.isDisabled}
  id={groupContext?.inputId}
  name={groupContext?.name}
  oninput={handleInput}
  placeholder={placeholder}
  readonly={groupContext?.isReadOnly}
  required={groupContext?.isRequired}
  type="text"
  value={fieldContext?.inputValue ?? ""}
  {...restProps}
/>
