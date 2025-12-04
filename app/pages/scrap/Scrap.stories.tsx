import type { Meta, StoryObj } from "@storybook/react";
import { Component as Scrap } from "./Scrap";

const meta: Meta<typeof Scrap> = {
  title: "Pages/Scrap",
  component: Scrap,
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
type Story = StoryObj<typeof Scrap>;

export const Default: Story = {};
