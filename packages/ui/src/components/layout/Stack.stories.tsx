import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const StackItem = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary/10 border-primary/20 rounded border p-4 text-center">{children}</div>
);

export const Vertical: Story = {
  args: {
    direction: "vertical",
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    direction: "horizontal",
    align: "center",
    justify: "center",
    className: "h-32",
    children: (
      <>
        <StackItem>Centered</StackItem>
        <StackItem>Items</StackItem>
      </>
    ),
  },
};

export const SpaceBetween: Story = {
  args: {
    direction: "horizontal",
    justify: "between",
    children: (
      <>
        <StackItem>Left</StackItem>
        <StackItem>Right</StackItem>
      </>
    ),
  },
};

export const LargeGap: Story = {
  args: {
    direction: "horizontal",
    gap: "xl",
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </>
    ),
  },
};
