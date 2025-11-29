import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Data Display/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      description: "Orientation of the divider",
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    variant: {
      description: "Visual variant",
      control: { type: "select" },
      options: ["default", "dashed"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <p className="text-foreground">Content above</p>
      <Divider />
      <p className="text-foreground">Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-foreground">Left</span>
      <Divider orientation="vertical" />
      <span className="text-foreground">Right</span>
    </div>
  ),
};

export const Dashed: Story = {
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: "dashed",
  },
};
