<script lang="ts">
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationNextIcon,
    PaginationPrevious,
    PaginationPreviousIcon,
    PaginationSummary,
  } from "../../components/pagination";

  let {
    onDisabledAnchorClick,
    onDisabledButtonClick,
    onEnabledAnchorClick,
  }: {
    onDisabledAnchorClick?: (event: MouseEvent) => void;
    onDisabledButtonClick?: (event: MouseEvent) => void;
    onEnabledAnchorClick?: (event: MouseEvent) => void;
  } = $props();

  const handleEnabledAnchorClick = (event: MouseEvent) => {
    event.preventDefault();
    onEnabledAnchorClick?.(event);
  };
</script>

<Pagination size="sm">
  <PaginationSummary>Page 2 of 8</PaginationSummary>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious aria-label="Previous page">
        <PaginationPreviousIcon />
        Previous
      </PaginationPrevious>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink isActive={true}>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext aria-label="Next page">
        Next
        <PaginationNextIcon />
      </PaginationNext>
    </PaginationItem>
  </PaginationContent>
</Pagination>

<Pagination aria-label="linked pages">
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        aria-label="Previous linked page"
        href="/pages/1"
        isDisabled={true}
        onclick={onDisabledAnchorClick}
      >
        <PaginationPreviousIcon />
        Previous
      </PaginationPrevious>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink aria-label="Page 3 link" href="/pages/3" isActive={true}>
        3
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        aria-label="Disabled page button"
        isDisabled={true}
        onclick={onDisabledButtonClick}
      >
        Disabled button
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext
        aria-label="Next linked page"
        href="/pages/4"
        onclick={handleEnabledAnchorClick}
      >
        Next
        <PaginationNextIcon />
      </PaginationNext>
    </PaginationItem>
  </PaginationContent>
</Pagination>
