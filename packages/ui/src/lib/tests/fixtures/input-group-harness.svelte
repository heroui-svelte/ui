<script lang="ts">
  import {
    InputGroup,
    InputGroupInput,
    InputGroupPrefix,
    InputGroupSuffix,
    InputGroupTextArea,
  } from "../../components/input-group";
</script>

<InputGroup fullWidth={true} variant="secondary">
  <InputGroupPrefix>@</InputGroupPrefix>
  <InputGroupInput aria-label="Username" />
  <InputGroupSuffix>.com</InputGroupSuffix>
</InputGroup>

<InputGroup isDisabled={true} isInvalid={true} isRequired={true}>
  <InputGroupTextArea aria-label="Notes" />
</InputGroup>

<InputGroup>
  <InputGroupInput aria-label="Command" />
  <InputGroupSuffix>
    <button type="button">Copy</button>
  </InputGroupSuffix>
</InputGroup>
