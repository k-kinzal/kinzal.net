import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import { Twitter, Facebook, Plus, Search, Menu } from "lucide-react";

const meta: Meta<typeof Icon> = {
  title: "Primitives/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: Twitter,
    size: 24,
  },
};

export const Small: Story = {
  args: {
    icon: Twitter,
    size: 16,
  },
};

export const Large: Story = {
  args: {
    icon: Twitter,
    size: 48,
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Icon icon={Twitter} size={24} />
      <Icon icon={Facebook} size={24} />
      <Icon icon={Plus} size={24} />
      <Icon icon={Search} size={24} />
      <Icon icon={Menu} size={24} />
    </div>
  ),
};
