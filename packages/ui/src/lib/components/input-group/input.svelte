<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getInputGroupContext} from "./context";

  let {
    "aria-describedby": ariaDescribedBy,
    class: className = "",
    disabled,
    id,
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    name,
    oninput,
    required,
    type,
    value,
    ...restProps
  }: {
    "aria-describedby"?: string;
    class?: string;
    disabled?: boolean;
    id?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    name?: string;
    oninput?: (event: Event & {currentTarget: EventTarget & HTMLInputElement}) => void;
    required?: boolean;
    type?: string;
    value?: string | number;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getInputGroupContext);
  const slotClass = $derived(context?.slots?.input?.({}) ?? "input-group__input");
  const effectiveDisabled = $derived(Boolean(disabled ?? isDisabled ?? context?.isDisabled));
  const effectiveInvalid = $derived(Boolean(isInvalid || context?.isInvalid));
  const effectiveReadOnly = $derived(Boolean(isReadOnly || context?.isReadOnly));
  const effectiveRequired = $derived(Boolean(required ?? isRequired ?? context?.isRequired));
  const resolvedId = $derived(id ?? context?.inputId);
  const resolvedName = $derived(name ?? context?.name);
  const resolvedType = $derived(type ?? context?.type);
  const resolvedValue = $derived(
    value === undefined
      ? context?.value
      : String(value),
  );
  const resolvedAriaDescribedBy = $derived(
    [ariaDescribedBy, context?.describedBy].filter(Boolean).join(" ") || undefined,
  );

  const handleInput = (event: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
    context?.setValue?.(event.currentTarget.value);
    oninput?.(event);
  };
</script>

<input
  aria-describedby={resolvedAriaDescribedBy}
  aria-invalid={effectiveInvalid ? "true" : undefined}
  class={cn(slotClass, className)}
  data-disabled={withDataState(effectiveDisabled)}
  data-invalid={withDataState(effectiveInvalid)}
  data-readonly={withDataState(effectiveReadOnly)}
  data-required={withDataState(effectiveRequired)}
  data-slot="input-group-input"
  disabled={effectiveDisabled}
  id={resolvedId}
  name={resolvedName}
  oninput={handleInput}
  readonly={effectiveReadOnly}
  required={effectiveRequired}
  type={resolvedType}
  value={resolvedValue}
  {...restProps}
 />
