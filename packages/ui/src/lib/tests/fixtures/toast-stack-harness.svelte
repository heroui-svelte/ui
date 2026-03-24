<script lang="ts">
  import {
    Toast,
    ToastCloseButton,
    ToastContent,
    ToastDescription,
    ToastIndicator,
    ToastProvider,
    ToastTitle,
  } from "../../components/toast";
</script>

<ToastProvider placement="bottom">
  <Toast data-testid="toast-new" toastKey="newest" variant="default">
    <ToastIndicator />
    <ToastContent>
      <ToastTitle>Newest</ToastTitle>
      <ToastDescription>Front toast</ToastDescription>
    </ToastContent>
    <ToastCloseButton aria-label="Close newest toast" />
  </Toast>
  <Toast data-testid="toast-old" toastKey="older" variant="default">
    <ToastIndicator />
    <ToastContent>
      <ToastTitle>Older</ToastTitle>
      <ToastDescription>Back toast</ToastDescription>
    </ToastContent>
    <ToastCloseButton aria-label="Close older toast" />
  </Toast>
</ToastProvider>
