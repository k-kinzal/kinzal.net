import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Data Display/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: "Size of the avatar",
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    shape: {
      description: "Shape of the avatar",
      control: { type: "select" },
      options: ["circle", "square"],
    },
    fallback: {
      description: "Fallback text (initials)",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User avatar",
  },
};

export const WithFallback: Story = {
  args: {
    fallback: "JD",
    alt: "John Doe",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" fallback="SM" alt="Small" />
      <Avatar size="md" fallback="MD" alt="Medium" />
      <Avatar size="lg" fallback="LG" alt="Large" />
      <Avatar size="xl" fallback="XL" alt="Extra large" />
    </div>
  ),
};

export const Square: Story = {
  args: {
    fallback: "AB",
    alt: "Alice Brown",
    shape: "square",
    size: "lg",
  },
};
