<script lang="ts">
  import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseTrigger,
    ModalContainer,
    ModalDialog,
    ModalFooter,
    ModalHeader,
    ModalHeading,
    ModalTrigger,
  } from "../../components/modal";
</script>

<Modal>
  <ModalTrigger>Open modal</ModalTrigger>
  <ModalBackdrop>
    <ModalContainer placement="center" size="sm">
      <ModalDialog>
        <ModalCloseTrigger />
        <ModalHeader>
          <ModalHeading>Modal title</ModalHeading>
        </ModalHeader>
        <ModalBody>Modal content</ModalBody>
        <ModalFooter>
          <button type="button">Confirm</button>
        </ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </ModalBackdrop>
</Modal>
