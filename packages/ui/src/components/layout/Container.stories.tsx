import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

const meta: Meta<typeof Container> = {
  title: "Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-background-muted p-4 text-center">
        Container with max-width
      </div>
    ),
  },
};

export const Fluid: Story = {
  args: {
    fluid: true,
    children: (
      <div className="bg-background-muted p-4 text-center">
        Fluid container (full width)
      </div>
    ),
  },
};
