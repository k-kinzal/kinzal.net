import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Popover } from "./Popover";
import { Button } from "../primitives/Button";
import { IconButton } from "../primitives/IconButton";
import { Icon } from "../primitives/Icon";
import { Stack } from "../layout/Stack";
import { Text } from "../typography/Text";
import { Divider } from "../data-display/Divider";
import { Settings, User, LogOut, ChevronDown } from "lucide-react";

const meta = {
  title: "Overlay/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: (
      <div className="p-4">
        <Text>This is popover content</Text>
      </div>
    ),
    children: <Button>Open Popover</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <Stack gap="lg" align="center" className="p-16">
      <Stack direction="horizontal" gap="sm">
        <Popover
          content={<div className="p-2">Top Start</div>}
          placement="top-start"
        >
          <Button variant="outline" size="sm">
            Top Start
          </Button>
        </Popover>
        <Popover content={<div className="p-2">Top</div>} placement="top">
          <Button variant="outline" size="sm">
            Top
          </Button>
        </Popover>
        <Popover
          content={<div className="p-2">Top End</div>}
          placement="top-end"
        >
          <Button variant="outline" size="sm">
            Top End
          </Button>
        </Popover>
      </Stack>
      <Stack direction="horizontal" gap="xl">
        <Popover content={<div className="p-2">Left</div>} placement="left">
          <Button variant="outline" size="sm">
            Left
          </Button>
        </Popover>
        <Popover content={<div className="p-2">Right</div>} placement="right">
          <Button variant="outline" size="sm">
            Right
          </Button>
        </Popover>
      </Stack>
      <Stack direction="horizontal" gap="sm">
        <Popover
          content={<div className="p-2">Bottom Start</div>}
          placement="bottom-start"
        >
          <Button variant="outline" size="sm">
            Bottom Start
          </Button>
        </Popover>
        <Popover content={<div className="p-2">Bottom</div>} placement="bottom">
          <Button variant="outline" size="sm">
            Bottom
          </Button>
        </Popover>
        <Popover
          content={<div className="p-2">Bottom End</div>}
          placement="bottom-end"
        >
          <Button variant="outline" size="sm">
            Bottom End
          </Button>
        </Popover>
      </Stack>
    </Stack>
  ),
};

export const UserMenu: Story = {
  render: () => (
    <Popover
      placement="bottom-end"
      content={
        <Stack gap="none" className="w-48 py-1">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-background-muted">
            <Icon icon={User} size={16} />
            Profile
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-background-muted">
            <Icon icon={Settings} size={16} />
            Settings
          </button>
          <Divider />
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-left text-red-600 hover:bg-background-muted">
            <Icon icon={LogOut} size={16} />
            Sign out
          </button>
        </Stack>
      }
    >
      <Button variant="outline">
        <Stack direction="horizontal" gap="xs" align="center">
          <Icon icon={User} size={16} />
          <span>Account</span>
          <Icon icon={ChevronDown} size={16} />
        </Stack>
      </Button>
    </Popover>
  ),
};

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Stack gap="md" align="center">
      <Popover
        content={
          <Stack gap="sm" className="p-4 w-64">
            <Text className="font-medium">Controlled Popover</Text>
            <Text size="sm" className="text-foreground-muted">
              This popover is controlled externally.
            </Text>
            <Button size="sm" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Stack>
        }
        open={open}
        onOpenChange={setOpen}
      >
        <Button>Toggle Popover</Button>
      </Popover>
      <Text size="sm">Status: {open ? "Open" : "Closed"}</Text>
    </Stack>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const WithForm: Story = {
  render: () => (
    <Popover
      placement="bottom-start"
      content={
        <Stack gap="md" className="p-4 w-72">
          <Text className="font-medium">Filter Options</Text>
          <Stack gap="sm">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              Show completed
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              Show archived
            </label>
          </Stack>
          <Stack direction="horizontal" gap="sm" justify="end">
            <Button variant="ghost" size="sm">
              Reset
            </Button>
            <Button size="sm">Apply</Button>
          </Stack>
        </Stack>
      }
    >
      <Button variant="outline">Filters</Button>
    </Popover>
  ),
};

export const WithIconButton: Story = {
  render: () => (
    <Popover
      placement="bottom-end"
      content={
        <Stack gap="none" className="w-40 py-1">
          <button className="px-4 py-2 text-sm text-left hover:bg-background-muted">
            Edit
          </button>
          <button className="px-4 py-2 text-sm text-left hover:bg-background-muted">
            Duplicate
          </button>
          <button className="px-4 py-2 text-sm text-left text-red-600 hover:bg-background-muted">
            Delete
          </button>
        </Stack>
      }
    >
      <IconButton aria-label="Options" variant="ghost">
        <Icon icon={Settings} size={18} />
      </IconButton>
    </Popover>
  ),
};
