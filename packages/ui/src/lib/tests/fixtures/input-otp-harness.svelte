<script lang="ts">
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "../../components/input-otp";

  let {
    onValueChange,
  }: {
    onValueChange?: (value: string) => void;
  } = $props();
</script>

<InputOTP
  defaultValue="12"
  isInvalid={true}
  maxLength={4}
  onValueChange={onValueChange}
  variant="secondary"
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSeparator>/</InputOTPSeparator>
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>
