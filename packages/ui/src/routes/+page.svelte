<script lang="ts">
  import {onDestroy} from "svelte";
  import {DEFAULT_TOAST_TIMEOUT} from "$lib/components/toast/constants";
  import type {HeroColor} from "$lib/internal/color";

  import {
    Accordion, AccordionItem, AccordionHeading, AccordionTrigger, AccordionPanel, AccordionIndicator, AccordionBody,
    AlertDialog, AlertDialogTrigger, AlertDialogBackdrop, AlertDialogContainer, AlertDialogDialog, AlertDialogHeader, AlertDialogHeading, AlertDialogBody, AlertDialogFooter, AlertDialogCloseTrigger,
    Badge, BadgeLabel, BadgeAnchor,
    Button,
    ButtonGroup, ButtonGroupSeparator,
    Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
    Checkbox, CheckboxContent, CheckboxControl, CheckboxIndicator,
    CheckboxGroup,
    CloseButton,
    Description,
    Dropdown, DropdownTrigger, DropdownPopover, DropdownMenu, DropdownItem, DropdownItemIndicator,
    Drawer, DrawerTrigger, DrawerBackdrop, DrawerContent, DrawerDialog, DrawerHeader, DrawerHeading, DrawerBody, DrawerFooter, DrawerHandle, DrawerCloseTrigger,
    Input,
    ListBox, ListBoxItem, ListBoxItemIndicator,
    Label,
    Link,
    Modal, ModalTrigger, ModalBackdrop, ModalContainer, ModalDialog, ModalHeader, ModalHeading, ModalBody, ModalFooter, ModalCloseTrigger,
    NumberField, NumberFieldGroup, NumberFieldInput, NumberFieldDecrementButton, NumberFieldIncrementButton,
    Popover, PopoverTrigger, PopoverContent, PopoverDialog, PopoverHeading, PopoverArrow,
    Radio, RadioContent, RadioControl, RadioIndicator,
    RadioGroup,
    Select, SelectTrigger, SelectValue, SelectIndicator, SelectPopover,
    Separator,
    Skeleton,
    Spinner,
    Surface,
    Switch, SwitchContent, SwitchControl, SwitchThumb,
    SwitchGroup,
    Table, TableScrollContainer, TableContent, TableHeader, TableColumn, TableBody, TableRow, TableCell, TableFooter, TableLoadMoreItem, TableLoadMoreContent,
    Tabs, TabsRoot, TabListContainer, TabList, Tab, TabIndicator, TabSeparator, TabPanel,
    TextArea,
    TimeField,
    Toast, ToastProvider, ToastContent, ToastIndicator, ToastTitle, ToastDescription, ToastCloseButton,
    Tooltip, TooltipTrigger, TooltipContent, TooltipArrow,
    Disclosure, DisclosureHeading, DisclosureTrigger, DisclosureContent, DisclosureBody, DisclosureIndicator,
    DisclosureGroup,
    Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationPreviousIcon, PaginationNext, PaginationNextIcon, PaginationEllipsis,
    ComboBox, ComboBoxInputGroup, ComboBoxTrigger, ComboBoxPopover,
    InputGroup, InputGroupInput, InputGroupPrefix, InputGroupSuffix,
    TextField,
    Autocomplete, AutocompleteTrigger, AutocompleteValue, AutocompleteIndicator, AutocompleteClearButton, AutocompletePopover,
    SearchField, SearchFieldGroup, SearchFieldInput, SearchFieldSearchIcon, SearchFieldClearButton,
    Slider, SliderTrack, SliderFill, SliderThumb, SliderOutput,
    InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator,
    DateField,
    DatePicker, DatePickerTrigger, DatePickerPopover,
    DateRangePicker, DateRangePickerTrigger, DateRangePickerPopover,
    ColorArea, ColorAreaThumb,
    ColorField, ColorFieldGroup, ColorFieldInput, ColorFieldPrefix, ColorFieldSuffix,
    ColorPicker, ColorPickerTrigger, ColorPickerPopover,
    ColorSlider, ColorSliderTrack, ColorSliderThumb, ColorSliderOutput,
    ColorSwatch,
    ColorSwatchPicker, ColorSwatchPickerItem, ColorSwatchPickerSwatch, ColorSwatchPickerIndicator,
  } from "$lib/components";

  type PreviewToast = {
    id: number;
  };

  const colorPresets = [
    "#F43F5E",
    "#D946EF",
    "#8B5CF6",
    "#3B82F6",
    "#06B6D4",
    "#10B981",
    "#84CC16",
  ];

  let previewToasts = $state<PreviewToast[]>([]);
  let previewToastCounter = 0;
  const previewToastTimers = new Map<number, ReturnType<typeof setTimeout>>();
  let demoSwatchPickerColor = $state("#8B5CF6");
  let demoAreaColor = $state("hsl(200, 100%, 50%)");
  let demoSliderColor = $state("hsla(200, 85%, 48%, 0.8)");
  let demoFieldColor = $state("#0485F7");
  let demoPickerColor = $state("#325578");

  const updatePreviewToasts = (updater: () => void) => {
    const documentWithViewTransitions =
      typeof document !== "undefined"
        ? (document as Document & {
            startViewTransition?: (callback: () => void) => void;
          })
        : undefined;

    if (documentWithViewTransitions?.startViewTransition) {
      try {
        documentWithViewTransitions.startViewTransition(() => {
          updater();
        });

        return;
      } catch {
        updater();
        return;
      }
    }

    updater();
  };

  const clearPreviewToastTimer = (id: number) => {
    const timer = previewToastTimers.get(id);

    if (timer) {
      clearTimeout(timer);
      previewToastTimers.delete(id);
    }
  };

  const hidePreviewToast = (id: number) => {
    clearPreviewToastTimer(id);
    updatePreviewToasts(() => {
      previewToasts = previewToasts.filter((toast) => toast.id !== id);
    });
  };

  const showPreviewToast = () => {
    const id = ++previewToastCounter;
    updatePreviewToasts(() => {
      previewToasts = [{id}, ...previewToasts];
    });
    previewToastTimers.set(
      id,
      setTimeout(() => {
        hidePreviewToast(id);
      }, DEFAULT_TOAST_TIMEOUT),
    );
  };

  onDestroy(() => {
    for (const timer of previewToastTimers.values()) {
      clearTimeout(timer);
    }

    previewToastTimers.clear();
  });
</script>

<div class="min-h-screen bg-background p-8 text-foreground">
  <h1 class="mb-2 text-3xl font-bold">HeroUI Svelte — Component Playground</h1>
  <p class="mb-8 text-sm text-muted-foreground">79 ported component families</p>

  <div class="space-y-12">

    <!-- ===== BUTTON ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Button</h2>
      <div class="flex flex-wrap items-center gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="danger-soft">Danger Soft</Button>
        <Button isDisabled>Disabled</Button>
      </div>
      <div class="mt-3 flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button fullWidth>Full Width</Button>
      </div>
    </section>

    <!-- ===== BUTTON GROUP ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Button Group</h2>
      <ButtonGroup>
        <Button variant="outline">Left</Button>
        <ButtonGroupSeparator />
        <Button variant="outline">Center</Button>
        <ButtonGroupSeparator />
        <Button variant="outline">Right</Button>
      </ButtonGroup>
    </section>

    <!-- ===== LINK ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Link</h2>
      <div class="flex items-center gap-4">
        <Link href="#">Default link</Link>
        <Link href="#" isDisabled>Disabled link</Link>
      </div>
    </section>

    <!-- ===== INPUT ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Input</h2>
      <div class="flex flex-col gap-3" style="max-width: 320px;">
        <div>
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
        </div>
        <div>
          <Label>Disabled</Label>
          <Input placeholder="Disabled input" isDisabled />
        </div>
        <div>
          <Label isInvalid>Invalid</Label>
          <Input placeholder="Invalid input" isInvalid />
        </div>
      </div>
    </section>

    <!-- ===== TEXTAREA ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">TextArea</h2>
      <div style="max-width: 320px;">
        <Label>Message</Label>
        <TextArea placeholder="Write something..." />
      </div>
    </section>

    <!-- ===== LABEL & DESCRIPTION ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Label & Description</h2>
      <Label>Username</Label>
      <Description>Choose a unique username for your account.</Description>
    </section>

    <!-- ===== CHECKBOX ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Checkbox</h2>
      <div class="flex flex-col gap-3">
        <Checkbox>
          <CheckboxControl>
            <CheckboxIndicator />
          </CheckboxControl>
          <CheckboxContent>Accept terms and conditions</CheckboxContent>
        </Checkbox>
        <Checkbox defaultChecked>
          <CheckboxControl>
            <CheckboxIndicator />
          </CheckboxControl>
          <CheckboxContent>Checked by default</CheckboxContent>
        </Checkbox>
        <Checkbox isDisabled>
          <CheckboxControl>
            <CheckboxIndicator />
          </CheckboxControl>
          <CheckboxContent>Disabled</CheckboxContent>
        </Checkbox>
      </div>
    </section>

    <!-- ===== CHECKBOX GROUP ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Checkbox Group</h2>
      <CheckboxGroup>
        <Label>Select toppings</Label>
        <Checkbox value="cheese">
          <CheckboxControl><CheckboxIndicator /></CheckboxControl>
          <CheckboxContent>Cheese</CheckboxContent>
        </Checkbox>
        <Checkbox value="pepperoni">
          <CheckboxControl><CheckboxIndicator /></CheckboxControl>
          <CheckboxContent>Pepperoni</CheckboxContent>
        </Checkbox>
        <Checkbox value="mushrooms">
          <CheckboxControl><CheckboxIndicator /></CheckboxControl>
          <CheckboxContent>Mushrooms</CheckboxContent>
        </Checkbox>
      </CheckboxGroup>
    </section>

    <!-- ===== RADIO GROUP ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Radio Group</h2>
      <RadioGroup defaultValue="option1">
        <Label>Select an option</Label>
        <Radio value="option1">
          <RadioControl><RadioIndicator /></RadioControl>
          <RadioContent>Option 1</RadioContent>
        </Radio>
        <Radio value="option2">
          <RadioControl><RadioIndicator /></RadioControl>
          <RadioContent>Option 2</RadioContent>
        </Radio>
        <Radio value="option3" isDisabled>
          <RadioControl><RadioIndicator /></RadioControl>
          <RadioContent>Option 3 (disabled)</RadioContent>
        </Radio>
      </RadioGroup>
    </section>

    <!-- ===== SWITCH ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Switch</h2>
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <Switch>
            <SwitchControl><SwitchThumb /></SwitchControl>
            <SwitchContent>Notifications</SwitchContent>
          </Switch>
        </div>
        <div class="flex items-center gap-3">
          <Switch defaultChecked>
            <SwitchControl><SwitchThumb /></SwitchControl>
            <SwitchContent>Enabled by default</SwitchContent>
          </Switch>
        </div>
        <div class="flex items-center gap-3">
          <Switch isDisabled>
            <SwitchControl><SwitchThumb /></SwitchControl>
            <SwitchContent>Disabled</SwitchContent>
          </Switch>
        </div>
      </div>
    </section>

    <!-- ===== SWITCH GROUP ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Switch Group</h2>
      <SwitchGroup>
        <Label>Preferences</Label>
        <Switch>
          <SwitchControl><SwitchThumb /></SwitchControl>
          <SwitchContent>Email notifications</SwitchContent>
        </Switch>
        <Switch>
          <SwitchControl><SwitchThumb /></SwitchControl>
          <SwitchContent>Push notifications</SwitchContent>
        </Switch>
      </SwitchGroup>
    </section>

    <!-- ===== CARD ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Card</h2>
      <div class="flex flex-wrap gap-4">
        <Card class="w-72">
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Some content inside the card body.</p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">Action</Button>
          </CardFooter>
        </Card>
        <Card variant="secondary" class="w-72">
          <CardHeader>
            <CardTitle>Secondary</CardTitle>
            <CardDescription>Secondary variant</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Secondary card content.</p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- ===== SURFACE ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Surface</h2>
      <div class="flex flex-wrap gap-4">
        <Surface class="rounded-lg p-4">Default surface</Surface>
        <Surface variant="secondary" class="rounded-lg p-4">Secondary surface</Surface>
        <Surface variant="tertiary" class="rounded-lg p-4">Tertiary surface</Surface>
      </div>
    </section>

    <!-- ===== BADGE ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Badge</h2>
      <div class="flex flex-wrap items-center gap-6">
        <BadgeAnchor>
          <Button variant="outline">Inbox</Button>
          <Badge>
            <BadgeLabel>5</BadgeLabel>
          </Badge>
        </BadgeAnchor>
        <BadgeAnchor>
          <Button variant="outline">Alerts</Button>
          <Badge color="danger">
            <BadgeLabel>3</BadgeLabel>
          </Badge>
        </BadgeAnchor>
        <BadgeAnchor>
          <Button variant="outline">Status</Button>
          <Badge color="success">
            <BadgeLabel>OK</BadgeLabel>
          </Badge>
        </BadgeAnchor>
      </div>
    </section>

    <!-- ===== SPINNER ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Spinner</h2>
      <div class="flex items-center gap-4">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
        <Spinner color="accent" />
        <Spinner color="danger" />
        <Spinner color="success" />
        <Spinner color="warning" />
      </div>
    </section>

    <!-- ===== SKELETON ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Skeleton</h2>
      <div class="flex flex-col gap-3" style="max-width: 320px;">
        <Skeleton class="h-4 w-3/4 rounded" />
        <Skeleton class="h-4 w-1/2 rounded" />
        <Skeleton class="h-20 w-full rounded-lg" />
        <Skeleton animationType="shimmer" class="h-4 w-2/3 rounded" />
      </div>
    </section>

    <!-- ===== SEPARATOR ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Separator</h2>
      <div class="space-y-2">
        <p>Content above</p>
        <Separator />
        <p>Content below</p>
      </div>
      <div class="mt-4 flex h-8 items-center gap-4">
        <span>Left</span>
        <Separator orientation="vertical" />
        <span>Right</span>
      </div>
    </section>

    <!-- ===== CLOSE BUTTON ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Close Button</h2>
      <div class="flex items-center gap-3">
        <CloseButton />
        <CloseButton isDisabled />
      </div>
    </section>

    <!-- ===== ACCORDION ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Accordion</h2>
      <div style="max-width: 480px;">
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionHeading>
              <AccordionTrigger>
                What is HeroUI?
                <AccordionIndicator />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionPanel>
              <AccordionBody>
                HeroUI is a modern React and Svelte UI library built with Tailwind CSS v4.
              </AccordionBody>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionHeading>
              <AccordionTrigger>
                How do I install it?
                <AccordionIndicator />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionPanel>
              <AccordionBody>
                Install via npm or pnpm: pnpm add @heroui-svelte/ui
              </AccordionBody>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionHeading>
              <AccordionTrigger>
                Is it accessible?
                <AccordionIndicator />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionPanel>
              <AccordionBody>
                Yes — components are built on top of accessible primitives with full keyboard support.
              </AccordionBody>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- ===== TABS ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Tabs</h2>
      <div style="max-width: 480px;">
        <Tabs defaultSelectedKey="tab1">
          <TabListContainer>
            <TabList>
              <Tab id="tab1">Account</Tab>
              <Tab id="tab2">Security</Tab>
              <Tab id="tab3">Notifications</Tab>
            </TabList>
          </TabListContainer>
          <TabPanel id="tab1">
            <p class="p-4">Manage your account settings and preferences.</p>
          </TabPanel>
          <TabPanel id="tab2">
            <p class="p-4">Update your password and security options.</p>
          </TabPanel>
          <TabPanel id="tab3">
            <p class="p-4">Configure your notification preferences.</p>
          </TabPanel>
        </Tabs>
      </div>
    </section>

    <!-- ===== TOOLTIP ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Tooltip</h2>
      <div class="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            This is a tooltip
          </TooltipContent>
        </Tooltip>
      </div>
    </section>

    <!-- ===== POPOVER ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Popover</h2>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverDialog>
            <PopoverHeading>Popover Title</PopoverHeading>
            <p class="mt-2 text-sm">This is the popover content. You can put anything here.</p>
          </PopoverDialog>
        </PopoverContent>
      </Popover>
    </section>

    <!-- ===== MODAL ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Modal</h2>
      <Modal>
        <ModalTrigger>
          <Button variant="outline">Open Modal</Button>
        </ModalTrigger>
        <ModalBackdrop />
        <ModalContainer>
          <ModalDialog>
            <ModalHeader>
              <ModalHeading>Modal Title</ModalHeading>
              <ModalCloseTrigger />
            </ModalHeader>
            <ModalBody>
              <p>This is the modal body content. You can place any content here.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary">Confirm</Button>
            </ModalFooter>
          </ModalDialog>
        </ModalContainer>
      </Modal>
    </section>

    <!-- ===== ALERT DIALOG ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Alert Dialog</h2>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="danger">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogBackdrop />
        <AlertDialogContainer>
          <AlertDialogDialog>
            <AlertDialogHeader>
              <AlertDialogHeading>Are you sure?</AlertDialogHeading>
            </AlertDialogHeader>
            <AlertDialogBody>
              <p>This action cannot be undone. This will permanently delete your account and remove your data.</p>
            </AlertDialogBody>
            <AlertDialogFooter>
              <AlertDialogCloseTrigger>
                <Button variant="ghost">Cancel</Button>
              </AlertDialogCloseTrigger>
              <Button variant="danger">Delete</Button>
            </AlertDialogFooter>
          </AlertDialogDialog>
        </AlertDialogContainer>
      </AlertDialog>
    </section>

    <!-- ===== DISCLOSURE ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Disclosure</h2>
      <div style="max-width: 480px;">
        <Disclosure>
          <DisclosureHeading>
            <DisclosureTrigger>
              Click to expand
              <DisclosureIndicator />
            </DisclosureTrigger>
          </DisclosureHeading>
          <DisclosureContent>
            <DisclosureBody>
              This is the expanded content of a single disclosure.
            </DisclosureBody>
          </DisclosureContent>
        </Disclosure>
      </div>
    </section>

    <!-- ===== DISCLOSURE GROUP ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Disclosure Group</h2>
      <div style="max-width: 480px;">
        <DisclosureGroup>
          <Disclosure id="dg-1">
            <DisclosureHeading>
              <DisclosureTrigger>
                First item
                <DisclosureIndicator />
              </DisclosureTrigger>
            </DisclosureHeading>
            <DisclosureContent>
              <DisclosureBody>Content for the first disclosure item.</DisclosureBody>
            </DisclosureContent>
          </Disclosure>
          <Disclosure id="dg-2">
            <DisclosureHeading>
              <DisclosureTrigger>
                Second item
                <DisclosureIndicator />
              </DisclosureTrigger>
            </DisclosureHeading>
            <DisclosureContent>
              <DisclosureBody>Content for the second disclosure item.</DisclosureBody>
            </DisclosureContent>
          </Disclosure>
        </DisclosureGroup>
      </div>
    </section>

    <!-- ===== TEXTFIELD ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">TextField</h2>
      <div class="flex flex-col gap-3" style="max-width: 320px;">
        <TextField>
          <Label>Email</Label>
          <InputGroup>
            <InputGroupInput placeholder="you@example.com" />
          </InputGroup>
          <Description>We'll never share your email.</Description>
        </TextField>
        <TextField isInvalid>
          <Label>Invalid field</Label>
          <InputGroup>
            <InputGroupInput placeholder="Something wrong" />
          </InputGroup>
        </TextField>
      </div>
    </section>

    <!-- ===== INPUT GROUP ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Input Group</h2>
      <div class="flex flex-col gap-3" style="max-width: 320px;">
        <InputGroup>
          <InputGroupPrefix>https://</InputGroupPrefix>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Amount" />
          <InputGroupSuffix>.00</InputGroupSuffix>
        </InputGroup>
        <InputGroup>
          <InputGroupPrefix>$</InputGroupPrefix>
          <InputGroupInput placeholder="0.00" />
          <InputGroupSuffix>USD</InputGroupSuffix>
        </InputGroup>
      </div>
    </section>

    <!-- ===== SEARCH FIELD ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Search Field</h2>
      <div style="max-width: 320px;">
        <SearchField>
          <SearchFieldGroup>
            <SearchFieldSearchIcon />
            <SearchFieldInput placeholder="Search..." />
            <SearchFieldClearButton />
          </SearchFieldGroup>
        </SearchField>
      </div>
    </section>

    <!-- ===== SELECT ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Select</h2>
      <div class="w-72">
        <Select>
          <Label>Country</Label>
          <SelectTrigger aria-label="Choose a country">
            <SelectValue placeholder="Select a country" />
            <SelectIndicator />
          </SelectTrigger>
          <SelectPopover>
            <ListBox>
              <ListBoxItem textValue="United States" value="usa">
                United States
                <ListBoxItemIndicator />
              </ListBoxItem>
              <ListBoxItem textValue="Canada" value="canada">
                Canada
                <ListBoxItemIndicator />
              </ListBoxItem>
              <ListBoxItem textValue="Japan" value="japan">
                Japan
                <ListBoxItemIndicator />
              </ListBoxItem>
            </ListBox>
          </SelectPopover>
        </Select>
      </div>
    </section>

    <!-- ===== COMBO BOX ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Combo Box</h2>
      <div class="w-72">
        <ComboBox>
          <Label>Framework</Label>
          <ComboBoxInputGroup>
            <Input aria-label="Search frameworks" placeholder="Search frameworks..." />
            <ComboBoxTrigger aria-label="Toggle frameworks" />
          </ComboBoxInputGroup>
          <ComboBoxPopover>
            <ListBox>
              <ListBoxItem textValue="React" value="react">
                React
                <ListBoxItemIndicator />
              </ListBoxItem>
              <ListBoxItem textValue="Svelte" value="svelte">
                Svelte
                <ListBoxItemIndicator />
              </ListBoxItem>
              <ListBoxItem textValue="Vue" value="vue">
                Vue
                <ListBoxItemIndicator />
              </ListBoxItem>
            </ListBox>
          </ComboBoxPopover>
        </ComboBox>
      </div>
    </section>

    <!-- ===== DROPDOWN ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Dropdown</h2>
      <Dropdown>
        <DropdownTrigger>Quick Actions</DropdownTrigger>
        <DropdownPopover>
          <DropdownMenu selectionMode="multiple">
            <DropdownItem textValue="Analytics" value="analytics">
              <DropdownItemIndicator />
              Analytics
            </DropdownItem>
            <DropdownItem textValue="Billing" value="billing">
              <DropdownItemIndicator />
              Billing
            </DropdownItem>
            <DropdownItem textValue="Exports" value="exports">
              <DropdownItemIndicator />
              Exports
            </DropdownItem>
          </DropdownMenu>
        </DropdownPopover>
      </Dropdown>
    </section>

    <!-- ===== AUTOCOMPLETE ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Autocomplete</h2>
      <div class="w-72">
        <Autocomplete>
          <Label>Team Member</Label>
          <AutocompleteTrigger aria-label="Choose a team member">
            <AutocompleteValue placeholder="Select a team member" />
            <AutocompleteClearButton />
            <AutocompleteIndicator />
          </AutocompleteTrigger>
          <AutocompletePopover>
            <ListBox>
              <ListBoxItem textValue="Jude Kim" value="jude">
                Jude Kim
                <ListBoxItemIndicator />
              </ListBoxItem>
              <ListBoxItem textValue="Ada Lovelace" value="ada">
                Ada Lovelace
                <ListBoxItemIndicator />
              </ListBoxItem>
              <ListBoxItem textValue="Grace Hopper" value="grace">
                Grace Hopper
                <ListBoxItemIndicator />
              </ListBoxItem>
            </ListBox>
          </AutocompletePopover>
        </Autocomplete>
      </div>
    </section>

    <!-- ===== PAGINATION ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Pagination</h2>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious>
              <PaginationPreviousIcon />
            </PaginationPrevious>
          </PaginationItem>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
          <PaginationItem>
            <PaginationNext>
              <PaginationNextIcon />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>

    <!-- ===== SLIDER ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Slider</h2>
      <div class="flex flex-col gap-6" style="max-width: 320px;">
        <Slider defaultValue={30}>
          <Label>Volume</Label>
          <SliderOutput />
          <SliderTrack>
            <SliderFill />
            <SliderThumb index={0} />
          </SliderTrack>
        </Slider>
        <div>
          <Label>Price range</Label>
          <Slider
            defaultValue={[100, 500]}
            formatOptions={{currency: "USD", style: "currency"}}
            maxValue={1000}
            minValue={0}
            step={50}
          >
            <SliderOutput />
            <SliderTrack>
              <SliderFill />
              <SliderThumb index={0} />
              <SliderThumb index={1} />
            </SliderTrack>
          </Slider>
        </div>
        <div>
          <Label>Custom output</Label>
          <Slider defaultValue={30}>
            <SliderOutput />
            <SliderTrack>
              <SliderFill />
              <SliderThumb index={0} />
            </SliderTrack>
          </Slider>
        </div>
      </div>
    </section>

    <!-- ===== INPUT OTP ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Input OTP</h2>
      <div class="flex flex-col gap-4">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </section>

    <!-- ===== NUMBER FIELD ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Number Field</h2>
      <div class="w-80">
        <NumberField
          defaultValue={12.5}
          fullWidth={true}
          maxValue={20}
          minValue={0}
          step={0.5}
          variant="secondary"
        >
          <Label>Width</Label>
          <Description>Enter the width in pixels.</Description>
          <NumberFieldGroup>
            <NumberFieldDecrementButton />
            <NumberFieldInput class="w-[120px]" />
            <NumberFieldIncrementButton />
          </NumberFieldGroup>
        </NumberField>
      </div>
    </section>

    <!-- ===== TIME FIELD ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Time Field</h2>
      <div class="flex w-64 flex-col gap-1">
        <Label>Time</Label>
        <TimeField class="w-full" name="appointment-time" />
      </div>
    </section>

    <!-- ===== DATE FIELD ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Date Field</h2>
      <div class="flex w-64 flex-col gap-1">
        <Label>Date</Label>
        <DateField class="w-full" />
      </div>
    </section>

    <!-- ===== DATE PICKER ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Date Picker</h2>
      <div class="w-64">
        <DatePicker class="w-full">
          <DatePickerTrigger aria-label="Choose a date" />
          <DatePickerPopover />
        </DatePicker>
      </div>
    </section>

    <!-- ===== DATE RANGE PICKER ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Date Range Picker</h2>
      <div class="w-72">
        <DateRangePicker class="w-full">
          <DateRangePickerTrigger aria-label="Choose a date range" />
          <DateRangePickerPopover />
        </DateRangePicker>
      </div>
    </section>

    <!-- ===== COLOR SWATCH ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Color Swatch</h2>
      <div class="flex flex-wrap items-center gap-3">
        <ColorSwatch color="#0485F7" size="xs" />
        <ColorSwatch color="#EF4444" size="sm" />
        <ColorSwatch color="#F59E0B" size="md" />
        <ColorSwatch color="#10B981" size="lg" />
        <ColorSwatch color="#8B5CF6" shape="square" size="xl" />
      </div>
    </section>

    <!-- ===== COLOR SWATCH PICKER ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Color Swatch Picker</h2>
      <div class="flex flex-col gap-4">
        <ColorSwatchPicker
          onChange={(color: HeroColor) => {
            demoSwatchPickerColor = color.toString("hex");
          }}
          value={demoSwatchPickerColor}
        >
          {#each colorPresets as preset}
            <ColorSwatchPickerItem color={preset}>
              <ColorSwatchPickerSwatch />
              <ColorSwatchPickerIndicator />
            </ColorSwatchPickerItem>
          {/each}
        </ColorSwatchPicker>
        <p class="text-sm text-muted-foreground">
          Selected swatch: <span class="font-medium text-foreground">{demoSwatchPickerColor}</span>
        </p>
      </div>
    </section>

    <!-- ===== COLOR AREA ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Color Area</h2>
      <div class="flex max-w-xs flex-col gap-4">
        <ColorArea
          colorSpace="hsb"
          onChange={(color: HeroColor) => {
            demoAreaColor = color.toString("hsl");
          }}
          showDots
          value={demoAreaColor}
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorAreaThumb />
        </ColorArea>
        <div class="flex items-center gap-3">
          <ColorSwatch color={demoAreaColor} size="lg" />
          <span class="text-sm text-muted-foreground">{demoAreaColor}</span>
        </div>
      </div>
    </section>

    <!-- ===== COLOR SLIDER ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Color Slider</h2>
      <div class="flex w-72 flex-col gap-4">
        <ColorSlider
          channel="hue"
          colorSpace="hsb"
          onChange={(color: HeroColor) => {
            demoSliderColor = color.toString("hsl");
          }}
          value={demoSliderColor}
        >
          <Label>Hue</Label>
          <ColorSliderOutput />
          <ColorSliderTrack>
            <ColorSliderThumb />
          </ColorSliderTrack>
        </ColorSlider>
        <ColorSlider
          channel="alpha"
          colorSpace="hsb"
          onChange={(color: HeroColor) => {
            demoSliderColor = color.toString("css");
          }}
          value={demoSliderColor}
        >
          <Label>Alpha</Label>
          <ColorSliderOutput />
          <ColorSliderTrack>
            <ColorSliderThumb />
          </ColorSliderTrack>
        </ColorSlider>
        <div class="flex items-center gap-3">
          <ColorSwatch color={demoSliderColor} size="lg" />
          <span class="text-sm text-muted-foreground">{demoSliderColor}</span>
        </div>
      </div>
    </section>

    <!-- ===== COLOR FIELD ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Color Field</h2>
      <div class="w-[280px]">
        <ColorField
          onChange={(color: HeroColor) => {
            demoFieldColor = color.toString("hex");
          }}
          value={demoFieldColor}
        >
          <Label>Brand color</Label>
          <ColorFieldGroup>
            <ColorFieldPrefix>
              <ColorSwatch size="xs" />
            </ColorFieldPrefix>
            <ColorFieldInput />
            <ColorFieldSuffix>
              <span class="text-xs uppercase tracking-[0.12em]">hex</span>
            </ColorFieldSuffix>
          </ColorFieldGroup>
          <Description>Current value: {demoFieldColor}</Description>
        </ColorField>
      </div>
    </section>

    <!-- ===== COLOR PICKER ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Color Picker</h2>
      <div class="flex flex-col gap-4">
        <ColorPicker
          onChange={(color: HeroColor) => {
            demoPickerColor = color.toString("hex");
          }}
          value={demoPickerColor}
        >
          <ColorPickerTrigger>
            <ColorSwatch size="lg" />
            <Label>Accent color</Label>
          </ColorPickerTrigger>
          <ColorPickerPopover>
            <ColorSwatchPicker class="justify-center pt-2" size="xs">
              {#each colorPresets as preset}
                <ColorSwatchPickerItem color={preset}>
                  <ColorSwatchPickerSwatch />
                  <ColorSwatchPickerIndicator />
                </ColorSwatchPickerItem>
              {/each}
            </ColorSwatchPicker>
            <ColorArea aria-label="Color area" class="max-w-full" colorSpace="hsb" xChannel="saturation" yChannel="brightness">
              <ColorAreaThumb />
            </ColorArea>
            <ColorSlider aria-label="Hue slider" channel="hue" class="gap-1 px-1" colorSpace="hsb">
              <Label>Hue</Label>
              <ColorSliderOutput class="text-muted-foreground" />
              <ColorSliderTrack>
                <ColorSliderThumb />
              </ColorSliderTrack>
            </ColorSlider>
            <ColorField aria-label="Color field">
              <ColorFieldGroup variant="secondary">
                <ColorFieldPrefix>
                  <ColorSwatch size="xs" />
                </ColorFieldPrefix>
                <ColorFieldInput />
              </ColorFieldGroup>
            </ColorField>
          </ColorPickerPopover>
        </ColorPicker>
        <p class="text-sm text-muted-foreground">
          Picker value: <span class="font-medium text-foreground">{demoPickerColor}</span>
        </p>
      </div>
    </section>

    <!-- ===== DRAWER ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Drawer</h2>
      <Drawer>
        <DrawerTrigger>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerDialog>
            <DrawerHandle />
            <DrawerHeader>
              <DrawerHeading>Drawer Title</DrawerHeading>
              <DrawerCloseTrigger />
            </DrawerHeader>
            <DrawerBody>
              <p>Drawer body content goes here.</p>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="primary">Save</Button>
            </DrawerFooter>
          </DrawerDialog>
        </DrawerContent>
      </Drawer>
    </section>

    <!-- ===== TABLE ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Table</h2>
      <div class="max-w-4xl">
        <Table variant="secondary">
          <TableScrollContainer>
            <TableContent>
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Status</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Ada Lovelace</TableCell>
                  <TableCell>Research</TableCell>
                  <TableCell>Online</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Grace Hopper</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell>Away</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Radia Perlman</TableCell>
                  <TableCell>Systems</TableCell>
                  <TableCell>Reviewing</TableCell>
                </TableRow>
                <TableLoadMoreItem>
                  <TableCell colspan={3}>
                    <TableLoadMoreContent>
                      <Spinner size="sm" />
                      Loading more rows
                    </TableLoadMoreContent>
                  </TableCell>
                </TableLoadMoreItem>
              </TableBody>
            </TableContent>
          </TableScrollContainer>
          <TableFooter>Showing 3 of 24 team members</TableFooter>
        </Table>
      </div>
    </section>

    <!-- ===== TOAST ===== -->
    <section>
      <h2 class="mb-4 text-xl font-semibold">Toast</h2>
      <div class="flex flex-wrap items-center gap-3">
        <Button size="sm" variant="secondary" onclick={showPreviewToast}>Show Toast</Button>
        <p class="text-sm text-muted-foreground">Spawns a real floating toast in the viewport.</p>
      </div>
    </section>

  </div>

  <div class="mt-16 border-t pt-8 text-sm text-muted-foreground">
    <p>79/79 component families ported — {new Date().toLocaleDateString()}</p>
  </div>

  <ToastProvider placement="bottom">
    {#each previewToasts as previewToast (previewToast.id)}
      <Toast
        toastKey={previewToast.id}
        variant="default"
      >
          <ToastIndicator>
            <svg
              aria-hidden="true"
              data-slot="toast-default-icon"
              fill="none"
              role="presentation"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 7.25a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Zm5.75 1.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM1.75 12.5c0-2.071 1.679-3.75 3.75-3.75h.25c2.071 0 3.75 1.679 3.75 3.75v.75H1.75v-.75Zm8.25.75v-.5c0-.997-.324-1.918-.872-2.664.375-.217.809-.336 1.272-.336h.2c1.491 0 2.7 1.209 2.7 2.7v.8H10Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.35"
              />
            </svg>
          </ToastIndicator>
          <ToastContent>
            <ToastTitle>You have been invited to join a team</ToastTitle>
            <ToastDescription>Bob sent you an invitation to join HeroUI team</ToastDescription>
          </ToastContent>
          <ToastCloseButton aria-label="Close preview toast" onclick={() => hidePreviewToast(previewToast.id)} />
      </Toast>
    {/each}
  </ToastProvider>
</div>
