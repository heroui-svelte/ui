<script lang="ts">
  import {
    Tooltip,
    TooltipArrow,
    TooltipContent,
    TooltipTrigger,
  } from "../../components/tooltip";

  let {
    isOpen = true,
  }: {
    isOpen?: boolean;
  } = $props();
</script>

<Tooltip delay={0} {isOpen}>
  <TooltipTrigger>Hover target</TooltipTrigger>
  <TooltipContent placement="bottom" showArrow={true}>
    <TooltipArrow />
    <p>Tooltip content</p>
  </TooltipContent>
</Tooltip>
