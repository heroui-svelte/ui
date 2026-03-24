<script lang="ts">
  import {
    Drawer,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerDialog,
    DrawerFooter,
    DrawerHandle,
    DrawerHeader,
    DrawerHeading,
    DrawerTrigger,
  } from "../../components/drawer";
</script>

<Drawer>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerBackdrop>
    <DrawerContent placement="right">
      <DrawerDialog>
        <DrawerCloseTrigger />
        <DrawerHandle />
        <DrawerHeader>
          <DrawerHeading>Drawer title</DrawerHeading>
        </DrawerHeader>
        <DrawerBody>Drawer content</DrawerBody>
        <DrawerFooter>
          <button type="button">Apply</button>
        </DrawerFooter>
      </DrawerDialog>
    </DrawerContent>
  </DrawerBackdrop>
</Drawer>
