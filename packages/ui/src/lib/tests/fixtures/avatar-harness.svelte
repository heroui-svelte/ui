<script lang="ts">
  import {Avatar, AvatarFallback, AvatarImage} from "../../components/avatar";
</script>

<Avatar color="accent" size="lg" variant="soft">
  <AvatarImage alt="Profile" src="/avatar.png" />
  <AvatarFallback delayMs={200}>JK</AvatarFallback>
</Avatar>
