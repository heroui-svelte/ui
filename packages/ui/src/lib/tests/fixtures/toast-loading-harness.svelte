<script lang="ts">
  import {
    Toast,
    ToastIndicator,
    ToastProvider,
  } from "../../components/toast";
</script>

<ToastProvider>
  <Toast isLoading>
    <ToastIndicator />
  </Toast>
</ToastProvider>
