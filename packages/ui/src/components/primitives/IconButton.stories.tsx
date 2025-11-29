import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import { Twitter, Facebook, Plus, Search } from "lucide-react";

const meta: Meta<typeof IconButton> = {
  title: "Primitives/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    "aria-label": {
      control: "text",
      description: "Required for accessibility. Describes the button's action.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "required" },
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    "aria-label": "Share on Twitter",
    children: <Icon icon={Twitter} size={20} />,
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    "aria-label": "Share on Facebook",
    children: <Icon icon={Facebook} size={20} />,
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    "aria-label": "Search",
    children: <Icon icon={Search} size={20} />,
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    "aria-label": "Add item",
    children: <Icon icon={Plus} size={16} />,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    "aria-label": "Add item",
    children: <Icon icon={Plus} size={28} />,
    size: "lg",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton variant="primary" aria-label="Share on Twitter">
        <Icon icon={Twitter} size={20} />
      </IconButton>
      <IconButton variant="secondary" aria-label="Share on Facebook">
        <Icon icon={Facebook} size={20} />
      </IconButton>
      <IconButton variant="ghost" aria-label="Search">
        <Icon icon={Search} size={20} />
      </IconButton>
    </div>
  ),
};
