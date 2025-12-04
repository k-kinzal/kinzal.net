import type { Meta, StoryObj } from "@storybook/react";
import { GooglePlusIcon } from "./GooglePlusIcon";

const meta: Meta<typeof GooglePlusIcon> = {
  title: "Social/GooglePlusIcon",
  component: GooglePlusIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GooglePlusIcon>;

export const Default: Story = {
  args: {
    shareUrl: "https://example.com",
  },
};
