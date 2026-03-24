<script lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableContent,
    TableFooter,
    TableHeader,
    TableLoadMoreContent,
    TableLoadMoreItem,
    TableRow,
    TableScrollContainer,
  } from "../../components/table";
</script>

<Table variant="secondary">
  <TableScrollContainer>
    <TableContent>
      <TableHeader>
        <TableColumn>Name</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ada</TableCell>
        </TableRow>
        <TableLoadMoreItem>
          <TableCell colspan={1}>
            <TableLoadMoreContent>Loading</TableLoadMoreContent>
          </TableCell>
        </TableLoadMoreItem>
      </TableBody>
    </TableContent>
  </TableScrollContainer>
  <TableFooter>Summary</TableFooter>
</Table>
