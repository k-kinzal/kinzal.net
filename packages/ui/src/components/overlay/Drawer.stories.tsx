import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerClose } from "./Drawer";
import { Button } from "../primitives/Button";
import { Stack } from "../layout/Stack";
import { Text } from "../typography/Text";
import { Divider } from "../data-display/Divider";
import { Icon } from "../primitives/Icon";
import { Settings, User, Bell, Shield, Palette } from "lucide-react";

const meta = {
  title: "Overlay/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper components to use hooks in stories
function DefaultDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerBody>
          <Text>This is the drawer content. You can put anything here.</Text>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

function SidesDemo() {
  const [side, setSide] = useState<"left" | "right" | "top" | "bottom">("right");
  const [open, setOpen] = useState(false);
  return (
    <Stack gap="md" align="center">
      <Stack direction="horizontal" gap="sm">
        <Button
          variant="outline"
          onClick={() => {
            setSide("left");
            setOpen(true);
          }}
        >
          Left
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSide("right");
            setOpen(true);
          }}
        >
          Right
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSide("top");
            setOpen(true);
          }}
        >
          Top
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSide("bottom");
            setOpen(true);
          }}
        >
          Bottom
        </Button>
      </Stack>
      <Drawer open={open} onOpenChange={setOpen} side={side}>
        <DrawerHeader>
          <DrawerTitle>Drawer from {side}</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerBody>
          <Text>This drawer slides in from the {side}.</Text>
        </DrawerBody>
      </Drawer>
    </Stack>
  );
}

function NavigationDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Menu</Button>
      <Drawer open={open} onOpenChange={setOpen} side="left">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerBody className="p-0">
          <nav>
            <button className="hover:bg-background-muted flex w-full items-center gap-3 px-4 py-3 text-left">
              <Icon icon={User} size={20} />
              <span>Profile</span>
            </button>
            <button className="hover:bg-background-muted flex w-full items-center gap-3 px-4 py-3 text-left">
              <Icon icon={Settings} size={20} />
              <span>Settings</span>
            </button>
            <button className="hover:bg-background-muted flex w-full items-center gap-3 px-4 py-3 text-left">
              <Icon icon={Bell} size={20} />
              <span>Notifications</span>
            </button>
            <Divider />
            <button className="hover:bg-background-muted flex w-full items-center gap-3 px-4 py-3 text-left">
              <Icon icon={Shield} size={20} />
              <span>Privacy</span>
            </button>
            <button className="hover:bg-background-muted flex w-full items-center gap-3 px-4 py-3 text-left">
              <Icon icon={Palette} size={20} />
              <span>Appearance</span>
            </button>
          </nav>
        </DrawerBody>
      </Drawer>
    </>
  );
}

function SettingsDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Settings</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerBody>
          <Stack gap="lg">
            <Stack gap="sm">
              <Text className="font-medium">Notifications</Text>
              <label className="flex items-center justify-between">
                <span className="text-sm">Email notifications</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Push notifications</span>
                <input type="checkbox" className="rounded" />
              </label>
            </Stack>
            <Divider />
            <Stack gap="sm">
              <Text className="font-medium">Privacy</Text>
              <label className="flex items-center justify-between">
                <span className="text-sm">Profile visible</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Show activity status</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </label>
            </Stack>
            <Divider />
            <Stack gap="sm">
              <Text className="font-medium">Theme</Text>
              <select className="border-border bg-background w-full rounded border px-3 py-2">
                <option>System</option>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </Stack>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

function WithoutOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen} overlay={false}>
        <DrawerHeader>
          <DrawerTitle>No Overlay</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerBody>
          <Text>This drawer has no background overlay. The content behind is still visible.</Text>
        </DrawerBody>
      </Drawer>
    </>
  );
}

function BottomSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Bottom Sheet</Button>
      <Drawer open={open} onOpenChange={setOpen} side="bottom">
        <DrawerHeader>
          <DrawerTitle>Share</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerBody>
          <Stack direction="horizontal" gap="lg" justify="center">
            <Stack align="center" gap="xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                f
              </div>
              <Text size="sm">Facebook</Text>
            </Stack>
            <Stack align="center" gap="xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white">
                t
              </div>
              <Text size="sm">Twitter</Text>
            </Stack>
            <Stack align="center" gap="xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                w
              </div>
              <Text size="sm">WhatsApp</Text>
            </Stack>
            <Stack align="center" gap="xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 text-white">
                @
              </div>
              <Text size="sm">Email</Text>
            </Stack>
          </Stack>
        </DrawerBody>
      </Drawer>
    </>
  );
}

function LongContentDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerHeader>
          <DrawerTitle>Terms of Service</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerBody>
          <Stack gap="md">
            {Array.from({ length: 20 }, (_, i) => (
              <Text key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            ))}
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Decline
          </Button>
          <Button onClick={() => setOpen(false)}>Accept</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

export const Default: Story = {
  render: () => <DefaultDemo />,
};

export const Sides: Story = {
  render: () => <SidesDemo />,
};

export const Navigation: Story = {
  render: () => <NavigationDemo />,
};

export const SettingsDrawer: Story = {
  render: () => <SettingsDemo />,
};

export const WithoutOverlay: Story = {
  render: () => <WithoutOverlayDemo />,
};

export const BottomSheet: Story = {
  render: () => <BottomSheetDemo />,
};

export const LongContent: Story = {
  render: () => <LongContentDemo />,
};
