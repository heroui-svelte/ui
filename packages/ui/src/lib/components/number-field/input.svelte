<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getNumberFieldContext} from "./context";

  let {
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    class: className = "",
    disabled,
    id,
    inputmode,
    isDisabled,
    isReadOnly,
    isRequired,
    name,
    onblur,
    onfocus,
    oninput,
    onkeydown,
    placeholder,
    readonly,
    required,
    ...restProps
  }: {
    "aria-describedby"?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    class?: string;
    disabled?: boolean;
    id?: string;
    inputmode?: "decimal" | "numeric";
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    name?: string;
    onblur?: (event: FocusEvent & {currentTarget: EventTarget & HTMLInputElement}) => void;
    onfocus?: (event: FocusEvent & {currentTarget: EventTarget & HTMLInputElement}) => void;
    oninput?: (event: Event & {currentTarget: EventTarget & HTMLInputElement}) => void;
    onkeydown?: (event: KeyboardEvent & {currentTarget: EventTarget & HTMLInputElement}) => void;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    [key: string]: any;
  } = $props();

  let inputElement = $state<HTMLInputElement | null>(null);

  const context = safeGetContext(getNumberFieldContext);
  const slotClass = $derived(context?.slots?.input?.({}) ?? "number-field__input");
  const currentDisabled = $derived(Boolean(disabled || isDisabled || context?.isDisabled));
  const currentInvalid = $derived(Boolean(context?.isInvalid));
  const currentReadOnly = $derived(Boolean(readonly || isReadOnly || context?.isReadOnly));
  const currentRequired = $derived(Boolean(required ?? isRequired ?? context?.isRequired));
  const currentValue = $derived(context?.value);
  const currentDisplayValue = $derived(context?.displayValue ?? "");
  const resolvedId = $derived(id ?? context?.inputId);
  const resolvedInputMode = $derived(inputmode ?? context?.inputMode ?? "numeric");
  const resolvedName = $derived(name ?? context?.name);
  const resolvedAriaDescribedBy = $derived(
    [ariaDescribedBy, context?.describedBy].filter(Boolean).join(" ") || undefined,
  );
  const resolvedAriaLabelledBy = $derived(
    [ariaLabelledBy, context?.labelId].filter(Boolean).join(" ") || undefined,
  );

  const handleInput = (event: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
    context?.handleInput?.(event.currentTarget.value);
    oninput?.(event);
  };

  const handleFocus = (event: FocusEvent & {currentTarget: EventTarget & HTMLInputElement}) => {
    context?.handleFocus?.();
    onfocus?.(event);
  };

  const handleBlur = (event: FocusEvent & {currentTarget: EventTarget & HTMLInputElement}) => {
    context?.handleBlur?.();
    onblur?.(event);
  };

  const handleKeydown = (
    event: KeyboardEvent & {currentTarget: EventTarget & HTMLInputElement},
  ) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      context?.stepBy?.(1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      context?.stepBy?.(-1);
    } else if (event.key === "Home" && context?.minValue !== undefined) {
      event.preventDefault();
      context?.setValue?.(context.minValue);
    } else if (event.key === "End" && context?.maxValue !== undefined) {
      event.preventDefault();
      context?.setValue?.(context.maxValue);
    }

    onkeydown?.(event);
  };

  $effect(() => {
    context?.registerInputElement?.(inputElement);

    return () => {
      context?.registerInputElement?.(null);
    };
  });
</script>

<input
  bind:this={inputElement}
  aria-describedby={resolvedAriaDescribedBy}
  aria-invalid={currentInvalid ? "true" : undefined}
  aria-label={ariaLabel}
  aria-labelledby={ariaLabel ? undefined : resolvedAriaLabelledBy}
  aria-valuemax={context?.maxValue}
  aria-valuemin={context?.minValue}
  aria-valuenow={currentValue}
  aria-valuetext={currentDisplayValue || undefined}
  class={cn(slotClass, className)}
  data-disabled={withDataState(currentDisabled)}
  data-invalid={withDataState(currentInvalid)}
  data-readonly={withDataState(currentReadOnly)}
  data-required={withDataState(currentRequired)}
  data-slot="number-field-input"
  disabled={currentDisabled}
  id={resolvedId}
  inputmode={resolvedInputMode}
  name={resolvedName}
  onblur={handleBlur}
  onfocus={handleFocus}
  oninput={handleInput}
  onkeydown={handleKeydown}
  placeholder={placeholder}
  readonly={currentReadOnly}
  required={currentRequired}
  role="spinbutton"
  type="text"
  value={currentDisplayValue}
  {...restProps}
 />
