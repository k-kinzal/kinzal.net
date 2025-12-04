import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { ImageViewer } from "./ImageViewer";

const meta: Meta<typeof ImageViewer> = {
  title: "Gallery/ImageViewer",
  component: ImageViewer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    onClose: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImageViewer>;

export const Selected: Story = {
  args: {
    id: "img001.jpg",
    category: "original",
    filename: "img001.jpg",
    isSelected: true,
  },
};

export const NotSelected: Story = {
  args: {
    id: "img001.jpg",
    category: "original",
    filename: "img001.jpg",
    isSelected: false,
  },
};

export const Scrap: Story = {
  args: {
    id: "img001.jpg",
    category: "scrap",
    filename: "img001.jpg",
    isSelected: true,
  },
};
