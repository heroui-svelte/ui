<script lang="ts">
  import {Description} from "../../components/description";
  import {FieldError} from "../../components/field-error";
  import {InputGroup, InputGroupInput} from "../../components/input-group";
  import {Label} from "../../components/label";
  import {TextField} from "../../components/textfield";
</script>

<TextField
  defaultValue="jude@example.com"
  fullWidth={true}
  isInvalid={true}
  isRequired={true}
  name="email"
  variant="secondary"
>
  <Label>Email</Label>
  <InputGroup>
    <InputGroupInput />
  </InputGroup>
  <Description>We will only use this for updates.</Description>
  <FieldError>Please enter a valid email address.</FieldError>
</TextField>
