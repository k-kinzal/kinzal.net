import type { Meta, StoryObj } from "@storybook/react";
import { FacebookIcon } from "./FacebookIcon";

const meta: Meta<typeof FacebookIcon> = {
  title: "Social/FacebookIcon",
  component: FacebookIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FacebookIcon>;

export const Default: Story = {
  args: {
    shareUrl: "https://example.com",
  },
};
