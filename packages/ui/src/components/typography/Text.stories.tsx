import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Typography/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: "Text size",
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    variant: {
      description: "Color variant",
      control: { type: "select" },
      options: ["default", "muted", "inherit"],
    },
    as: {
      description: "HTML element",
      control: { type: "select" },
      options: ["p", "span"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "This is body text. It provides content and context for users.",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="lg">Large text size</Text>
      <Text size="md">Medium text size (default)</Text>
      <Text size="sm">Small text size</Text>
      <Text size="xs">Extra small text size</Text>
    </div>
  ),
};

export const Muted: Story = {
  args: {
    variant: "muted",
    children: "This is muted secondary text.",
  },
};

export const AsSpan: Story = {
  args: {
    as: "span",
    children: "This is inline text rendered as a span.",
  },
};
