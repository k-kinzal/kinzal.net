import type { Meta, StoryObj } from "@storybook/react";
import { Component as Original } from "./Original";

const meta: Meta<typeof Original> = {
  title: "Pages/Original",
  component: Original,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Original>;

export const Default: Story = {};
