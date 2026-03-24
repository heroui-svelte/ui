<script lang="ts">
  import {cn} from "../../internal/cn";
  import {safeGetContext} from "../../internal/context";
  import {withDataState} from "../../internal/slots";
  import {getSearchFieldContext} from "./context";

  let {
    "aria-describedby": ariaDescribedBy,
    class: className = "",
    disabled,
    id,
    isDisabled,
    isReadOnly,
    isRequired,
    name,
    oninput,
    required,
    type = "search",
    ...restProps
  }: {
    "aria-describedby"?: string;
    class?: string;
    disabled?: boolean;
    id?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    name?: string;
    oninput?: (event: Event & {currentTarget: EventTarget & HTMLInputElement}) => void;
    required?: boolean;
    type?: string;
    [key: string]: any;
  } = $props();

  const context = safeGetContext(getSearchFieldContext);
  const slotClass = $derived(context?.slots?.input?.({}) ?? "search-field__input");
  const currentDisabled = $derived(Boolean(disabled ?? isDisabled ?? context?.isDisabled));
  const currentInvalid = $derived(Boolean(context?.isInvalid));
  const currentReadOnly = $derived(Boolean(isReadOnly || context?.isReadOnly));
  const currentRequired = $derived(Boolean(required ?? isRequired ?? context?.isRequired));
  const currentValue = $derived(context?.value ?? "");
  const resolvedId = $derived(id ?? context?.inputId);
  const resolvedName = $derived(name ?? context?.name);
  const resolvedType = $derived(type ?? context?.type ?? "search");
  const resolvedAriaDescribedBy = $derived(
    [
      ariaDescribedBy,
      context?.describedBy,
    ]
      .filter(Boolean)
      .join(" ") || undefined,
  );

  let inputElement = $state<HTMLInputElement | null>(null);

  const handleInput = (event: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
    context?.setValue?.(event.currentTarget.value);
    oninput?.(event);
  };

  $effect(() => {
    context?.setInputElement?.(inputElement);

    return () => {
      context?.setInputElement?.(null);
    };
  });
</script>

<input
  bind:this={inputElement}
  aria-describedby={resolvedAriaDescribedBy}
  aria-invalid={currentInvalid ? "true" : undefined}
  class={cn(slotClass, className)}
  data-disabled={withDataState(currentDisabled)}
  data-invalid={withDataState(currentInvalid)}
  data-readonly={withDataState(currentReadOnly)}
  data-required={withDataState(currentRequired)}
  data-slot="search-field-input"
  disabled={currentDisabled}
  id={resolvedId}
  name={resolvedName}
  oninput={handleInput}
  readonly={currentReadOnly}
  required={currentRequired}
  type={resolvedType}
  value={currentValue}
  {...restProps}
 />
