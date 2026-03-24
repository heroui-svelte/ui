<script lang="ts">
  import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogCloseTrigger,
    AlertDialogContainer,
    AlertDialogDialog,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogHeading,
    AlertDialogIcon,
    AlertDialogTrigger,
  } from "../../components/alert-dialog";
</script>

<AlertDialog>
  <AlertDialogTrigger>Open alert dialog</AlertDialogTrigger>
  <AlertDialogBackdrop>
    <AlertDialogContainer placement="center" size="sm">
      <AlertDialogDialog>
        <AlertDialogCloseTrigger />
        <AlertDialogHeader>
          <AlertDialogIcon status="warning" />
          <AlertDialogHeading>Delete item</AlertDialogHeading>
        </AlertDialogHeader>
        <AlertDialogBody>This action cannot be undone.</AlertDialogBody>
        <AlertDialogFooter>
          <button type="button">Cancel</button>
          <button type="button">Delete</button>
        </AlertDialogFooter>
      </AlertDialogDialog>
    </AlertDialogContainer>
  </AlertDialogBackdrop>
</AlertDialog>
