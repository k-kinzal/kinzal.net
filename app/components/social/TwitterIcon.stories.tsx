import type { Meta, StoryObj } from "@storybook/react";
import { TwitterIcon } from "./TwitterIcon";

const meta: Meta<typeof TwitterIcon> = {
  title: "Social/TwitterIcon",
  component: TwitterIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TwitterIcon>;

export const Default: Story = {
  args: {
    shareUrl: "https://example.com",
  },
};

export const WithText: Story = {
  args: {
    shareUrl: "https://example.com",
    text: "Check out this site!",
  },
};
