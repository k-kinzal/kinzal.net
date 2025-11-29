import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "Typography/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      description: "Semantic heading level (h1-h6)",
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
    size: {
      description: "Visual size (independent of level)",
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: "Default Heading",
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  ),
};

export const CustomSize: Story = {
  args: {
    level: 2,
    size: "xs",
    children: "H2 with small visual size",
  },
};
