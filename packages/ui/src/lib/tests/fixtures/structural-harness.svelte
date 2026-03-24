<script lang="ts">
  import {Breadcrumbs, BreadcrumbsItem} from "../../components/breadcrumbs";
  import {ErrorMessage} from "../../components/error-message";
  import {FieldGroup, Fieldset, FieldsetActions, FieldsetLegend} from "../../components/fieldset";
  import {Form} from "../../components/form";
  import {Header} from "../../components/header";
  import {ScrollShadow} from "../../components/scroll-shadow";
</script>

<div class="flex flex-col gap-6">
  <Header>Preferences</Header>

  <Breadcrumbs>
    <BreadcrumbsItem href="/home">Home</BreadcrumbsItem>
    <BreadcrumbsItem href="/settings">Settings</BreadcrumbsItem>
    <BreadcrumbsItem>Profile</BreadcrumbsItem>
  </Breadcrumbs>

  <ErrorMessage>Email is required</ErrorMessage>

  <Form aria-label="Profile form">
    <Fieldset>
      <FieldsetLegend>Profile settings</FieldsetLegend>
      <FieldGroup>
        <div>Fields</div>
      </FieldGroup>
      <FieldsetActions>
        <button type="submit">Save</button>
      </FieldsetActions>
    </Fieldset>
  </Form>

  <ScrollShadow class="max-h-24" size={80} visibility="both">
    <div>Lots of content</div>
  </ScrollShadow>
</div>
