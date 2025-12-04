import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./DropdownMenu";
import { Icon } from "../primitives/Icon";
import { Stack } from "../layout/Stack";
import {
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Share,
  Download,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

const meta = {
  title: "Overlay/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border hover:bg-background-muted inline-flex items-center gap-1 rounded-md border px-4 py-2">
        Options
        <Icon icon={ChevronDown} size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border hover:bg-background-muted inline-flex items-center gap-1 rounded-md border px-4 py-2">
        Actions
        <Icon icon={ChevronDown} size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>
          <Stack direction="horizontal" gap="sm" align="center">
            <Icon icon={Edit} size={16} />
            Edit
          </Stack>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Stack direction="horizontal" gap="sm" align="center">
            <Icon icon={Copy} size={16} />
            Duplicate
          </Stack>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Stack direction="horizontal" gap="sm" align="center">
            <Icon icon={Share} size={16} />
            Share
          </Stack>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Stack direction="horizontal" gap="sm" align="center">
            <Icon icon={Download} size={16} />
            Download
          </Stack>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>
          <Stack direction="horizontal" gap="sm" align="center">
            <Icon icon={Trash2} size={16} />
            Delete
          </Stack>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border hover:bg-background-muted inline-flex items-center gap-1 rounded-md border px-4 py-2">
        <Icon icon={User} size={16} />
        Account
        <Icon icon={ChevronDown} size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <Stack direction="horizontal" gap="sm" align="center">
            <Icon icon={User} size={16} />
            Profile
          </Stack>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Stack direction="horizontal" gap="sm" align="center">
            <Icon icon={Settings} size={16} />
            Settings
          </Stack>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
        <DropdownMenuItem destructive>
          <Stack direction="horizontal" gap="sm" align="center">
            <Icon icon={LogOut} size={16} />
            Sign out
          </Stack>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithIconTrigger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="More options"
        className="hover:bg-background-muted rounded-md p-2"
      >
        <Icon icon={MoreVertical} size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent placement="bottom-end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Placements: Story = {
  render: () => (
    <Stack direction="horizontal" gap="xl" className="p-16">
      <DropdownMenu>
        <DropdownMenuTrigger className="border-border hover:bg-background-muted rounded-md border px-3 py-1.5 text-sm">
          Bottom Start
        </DropdownMenuTrigger>
        <DropdownMenuContent placement="bottom-start">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="border-border hover:bg-background-muted rounded-md border px-3 py-1.5 text-sm">
          Bottom End
        </DropdownMenuTrigger>
        <DropdownMenuContent placement="bottom-end">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="border-border hover:bg-background-muted rounded-md border px-3 py-1.5 text-sm">
          Top Start
        </DropdownMenuTrigger>
        <DropdownMenuContent placement="top-start">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="border-border hover:bg-background-muted rounded-md border px-3 py-1.5 text-sm">
          Top End
        </DropdownMenuTrigger>
        <DropdownMenuContent placement="top-end">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Stack>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border hover:bg-background-muted rounded-md border px-4 py-2">
        Options
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem disabled>Duplicate (disabled)</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive disabled>
          Delete (disabled)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const ContextMenuStyle: Story = {
  render: () => (
    <div className="border-border text-foreground-muted rounded-lg border border-dashed p-8 text-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-context-menu p-8">
          Right click simulation
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem>
            <Stack
              direction="horizontal"
              gap="sm"
              align="center"
              className="w-full justify-between"
            >
              <span>Cut</span>
              <span className="text-foreground-muted text-xs">Ctrl+X</span>
            </Stack>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Stack
              direction="horizontal"
              gap="sm"
              align="center"
              className="w-full justify-between"
            >
              <span>Copy</span>
              <span className="text-foreground-muted text-xs">Ctrl+C</span>
            </Stack>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Stack
              direction="horizontal"
              gap="sm"
              align="center"
              className="w-full justify-between"
            >
              <span>Paste</span>
              <span className="text-foreground-muted text-xs">Ctrl+V</span>
            </Stack>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};
