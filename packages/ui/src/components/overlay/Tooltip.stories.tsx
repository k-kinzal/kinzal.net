import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../primitives/Button";
import { IconButton } from "../primitives/IconButton";
import { Icon } from "../primitives/Icon";
import { Stack } from "../layout/Stack";
import { Info, Trash2, Edit, Share2 } from "lucide-react";

const meta = {
  title: "Overlay/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <Stack gap="xl" align="center" className="p-16">
      <Tooltip content="I'm on top" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Stack direction="horizontal" gap="xl">
        <Tooltip content="I'm on the left" placement="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="I'm on the right" placement="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </Stack>
      <Tooltip content="I'm on bottom" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
    </Stack>
  ),
};

export const WithIconButtons: Story = {
  render: () => (
    <Stack direction="horizontal" gap="sm">
      <Tooltip content="Edit item">
        <IconButton aria-label="Edit">
          <Icon icon={Edit} size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip content="Delete item">
        <IconButton aria-label="Delete" variant="ghost">
          <Icon icon={Trash2} size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip content="Share">
        <IconButton aria-label="Share" variant="outline">
          <Icon icon={Share2} size={18} />
        </IconButton>
      </Tooltip>
    </Stack>
  ),
};

export const WithDelay: Story = {
  args: {
    content: "I appear after 500ms",
    delay: 500,
    children: <Button>Slow tooltip</Button>,
  },
};

export const NoDelay: Story = {
  args: {
    content: "I appear instantly",
    delay: 0,
    children: <Button>Instant tooltip</Button>,
  },
};

export const Disabled: Story = {
  args: {
    content: "You won't see me",
    disabled: true,
    children: <Button>Disabled tooltip</Button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <Stack gap="xs">
        <span className="font-semibold">Pro tip</span>
        <span className="text-xs opacity-80">Press Ctrl+S to save your work</span>
      </Stack>
    ),
    children: (
      <IconButton aria-label="Info">
        <Icon icon={Info} size={18} />
      </IconButton>
    ),
  },
};

export const LongContent: Story = {
  args: {
    content:
      "This is a longer tooltip that explains something in more detail. It will wrap to multiple lines if needed.",
    children: <Button>Long tooltip</Button>,
    className: "max-w-xs",
  },
};
