<script lang="ts">
  import {
    Toast,
    ToastActionButton,
    ToastCloseButton,
    ToastContent,
    ToastDescription,
    ToastIndicator,
    ToastProvider,
    ToastTitle,
  } from "../../components/toast";
</script>

<ToastProvider placement="top end" width={320}>
  <Toast variant="success">
    <ToastIndicator />
    <ToastContent>
      <ToastTitle>Saved</ToastTitle>
      <ToastDescription>Profile updated</ToastDescription>
    </ToastContent>
    <ToastActionButton size="sm" variant="secondary">Undo</ToastActionButton>
    <ToastCloseButton aria-label="Close notification" />
  </Toast>
</ToastProvider>
