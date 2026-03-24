<script lang="ts">
  import {Tag, TagRemoveButton} from "../../components/tag";
  import {TagGroup, TagGroupList} from "../../components/tag-group";

  let {
    onGroupChange,
    onRemove,
  }: {
    onGroupChange?: (keys: Set<string>) => void;
    onRemove?: () => void;
  } = $props();
</script>

<TagGroup
  aria-label="Topics"
  onSelectionChange={onGroupChange}
  selectionMode="multiple"
  size="sm"
  variant="surface"
>
  <TagGroupList>
    <Tag allowsRemoving onRemove={onRemove} value="news">News</Tag>
    <Tag value="travel">Travel</Tag>
  </TagGroupList>
</TagGroup>
