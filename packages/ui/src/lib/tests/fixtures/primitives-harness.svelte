<script lang="ts">
  import {Alert, AlertContent, AlertDescription, AlertIndicator, AlertTitle} from "../../components/alert";
  import {Badge, BadgeLabel} from "../../components/badge";
  import {Button} from "../../components/button";
  import {ButtonGroup} from "../../components/button-group";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../components/card";
  import {Chip, ChipLabel} from "../../components/chip";
  import {CloseButton} from "../../components/close-button";
  import {Description} from "../../components/description";
  import {EmptyState} from "../../components/empty-state";
  import {FieldError} from "../../components/field-error";
  import {Input} from "../../components/input";
  import {Kbd, KbdAbbr, KbdContent} from "../../components/kbd";
  import {Label} from "../../components/label";
  import {Link, LinkIcon} from "../../components/link";
  import {Separator} from "../../components/separator";
  import {Skeleton} from "../../components/skeleton";
  import {Spinner} from "../../components/spinner";
  import {Surface} from "../../components/surface";
  import {TextArea} from "../../components/textarea";
  import {Text} from "../../components/text";
</script>

<div class="flex flex-col gap-6">
  <ButtonGroup fullWidth size="sm" variant="secondary">
    <Button>First action</Button>
    <Button>Second action</Button>
  </ButtonGroup>

  <Alert status="warning">
    <AlertIndicator />
    <AlertContent>
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>Check your settings</AlertDescription>
    </AlertContent>
  </Alert>

  <Input aria-label="Email" fullWidth variant="secondary" />
  <TextArea aria-label="Notes" value="Hello" variant="secondary" />

  <Link href="https://example.com">
    Docs
    <LinkIcon />
  </Link>

  <Surface variant="tertiary">Surface content</Surface>

  <Card variant="secondary">
    <CardHeader>
      <CardTitle>Card title</CardTitle>
      <CardDescription>Card description</CardDescription>
    </CardHeader>
    <CardContent>Card body</CardContent>
    <CardFooter>Card footer</CardFooter>
  </Card>

  <Badge color="success" variant="soft">
    <BadgeLabel>3</BadgeLabel>
  </Badge>

  <Chip color="accent" variant="primary">
    <ChipLabel>Chip text</ChipLabel>
  </Chip>

  <CloseButton />
  <Spinner color="danger" size="lg" />
  <Skeleton animationType="pulse" class="h-6 w-24" />
  <Label isInvalid isRequired>Email address</Label>
  <Description>Helper text</Description>
  <Text size="lg" variant="muted">Paragraph copy</Text>
  <FieldError>Field is required</FieldError>
  <EmptyState />
  <Kbd variant="light">
    <KbdAbbr keyValue="command" />
    <KbdContent>K</KbdContent>
  </Kbd>
  <Separator orientation="vertical" variant="secondary" />
</div>
