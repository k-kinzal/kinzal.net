import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Thumbnail } from "./Thumbnail";

const meta: Meta<typeof Thumbnail> = {
  title: "Gallery/Thumbnail",
  component: Thumbnail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onSelect: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px", height: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Thumbnail>;

export const Original: Story = {
  args: {
    filename: "img001.jpg",
    category: "original",
  },
};

export const Scrap: Story = {
  args: {
    filename: "img001.jpg",
    category: "scrap",
  },
};
