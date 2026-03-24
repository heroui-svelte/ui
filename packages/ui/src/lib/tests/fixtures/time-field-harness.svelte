<script lang="ts">
  import {
    TimeField,
    TimeFieldGroup,
    TimeFieldInput,
    TimeFieldInputContainer,
    TimeFieldPrefix,
    TimeFieldSegment,
    TimeFieldSuffix,
  } from "../../components/time-field";
</script>

<TimeField fullWidth name="custom-time">
  <TimeFieldGroup variant="secondary">
    <TimeFieldPrefix data-testid="time-prefix">T</TimeFieldPrefix>
    <TimeFieldInputContainer>
      <TimeFieldInput>
        {#snippet children({segments})}
          {#each segments as segment, index (`${segment.part}-${segment.value}-${index}`)}
            <TimeFieldSegment part={segment.part} value={segment.value} />
          {/each}
        {/snippet}
      </TimeFieldInput>
    </TimeFieldInputContainer>
    <TimeFieldSuffix data-testid="time-suffix">Z</TimeFieldSuffix>
  </TimeFieldGroup>
</TimeField>
