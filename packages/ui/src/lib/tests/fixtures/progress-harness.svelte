<script lang="ts">
  import {Meter, MeterFill, MeterOutput, MeterTrack} from "../../components/meter";
  import {
    ProgressBar,
    ProgressBarFill,
    ProgressBarOutput,
    ProgressBarTrack,
  } from "../../components/progress-bar";
  import {
    ProgressCircle,
    ProgressCircleFillCircle,
    ProgressCircleTrack,
    ProgressCircleTrackCircle,
  } from "../../components/progress-circle";
</script>

<div class="flex flex-col gap-6">
  <Meter color="success" value={40}>
    <MeterOutput />
    <MeterTrack>
      <MeterFill />
    </MeterTrack>
  </Meter>

  <ProgressBar color="warning" value={75}>
    <ProgressBarOutput />
    <ProgressBarTrack>
      <ProgressBarFill />
    </ProgressBarTrack>
  </ProgressBar>

  <ProgressBar isIndeterminate>
    <ProgressBarTrack>
      <ProgressBarFill />
    </ProgressBarTrack>
  </ProgressBar>

  <ProgressCircle color="danger" value={60}>
    <ProgressCircleTrack>
      <ProgressCircleTrackCircle />
      <ProgressCircleFillCircle />
    </ProgressCircleTrack>
  </ProgressCircle>
</div>
