import type { Meta, StoryObj } from "@storybook/react";
import { Component as Home } from "./Home";

const meta: Meta<typeof Home> = {
  title: "Pages/Home",
  component: Home,
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
type Story = StoryObj<typeof Home>;

export const Default: Story = {};
