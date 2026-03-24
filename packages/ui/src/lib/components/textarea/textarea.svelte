<script lang="ts">
  import {textAreaVariants} from "@heroui-svelte/styles";

  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {normalizeVariantResult, withDataState} from "../../internal/slots";
  import {getTextFieldContext} from "../textfield/context";

  let {
    "aria-describedby": ariaDescribedBy,
    class: className = "",
    disabled,
    fullWidth = false,
    id,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    name,
    oninput,
    required,
    variant,
    value,
    ...restProps
  }: {
    "aria-describedby"?: string;
    class?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    id?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    name?: string;
    oninput?: (event: Event & {currentTarget: EventTarget & HTMLTextAreaElement}) => void;
    required?: boolean;
    value?: string | number;
    variant?: "primary" | "secondary";
    [key: string]: any;
  } = $props();

  const textFieldContext = safeGetContext(getTextFieldContext);
  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled ?? textFieldContext?.isDisabled));
  const effectiveInvalid = $derived(Boolean(isInvalid || textFieldContext?.isInvalid));
  const effectiveReadOnly = $derived(Boolean(isReadOnly || textFieldContext?.isReadOnly));
  const effectiveRequired = $derived(Boolean(required ?? isRequired ?? textFieldContext?.isRequired));
  const resolvedVariant = $derived(variant ?? textFieldContext?.variant);
  const resolvedId = $derived(id ?? textFieldContext?.inputId);
  const resolvedName = $derived(name ?? textFieldContext?.name);
  const resolvedValue = $derived(
    value === undefined
      ? textFieldContext?.value
      : String(value),
  );
  const resolvedAriaDescribedBy = $derived(
    [
      ariaDescribedBy,
      textFieldContext?.describedBy,
    ]
      .filter(Boolean)
      .join(" ") || undefined,
  );
  const slots = $derived.by(
    () =>
      normalizeVariantResult(
        textAreaVariants({
          fullWidth,
          variant: resolvedVariant,
        }),
        "textarea",
      ),
  );
  const rootClass = $derived(slots.base?.({}) ?? "textarea");

  const handleInput = (event: Event & {currentTarget: EventTarget & HTMLTextAreaElement}) => {
    textFieldContext?.setValue?.(event.currentTarget.value);
    oninput?.(event);
  };
</script>

<textarea
  aria-describedby={resolvedAriaDescribedBy}
  aria-invalid={effectiveInvalid ? "true" : undefined}
  class={cn(rootClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-invalid={withDataState(effectiveInvalid)}
  data-readonly={withDataState(effectiveReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-slot="textarea"
  disabled={effectiveDisabled}
  id={resolvedId}
  name={resolvedName}
  oninput={handleInput}
  readonly={effectiveReadOnly}
  required={effectiveRequired}
  value={resolvedValue}
  {...restProps}
></textarea>
