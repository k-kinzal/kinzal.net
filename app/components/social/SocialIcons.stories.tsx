import type { Meta, StoryObj } from "@storybook/react";
import { SocialIcons } from "./SocialIcons";

const meta: Meta<typeof SocialIcons> = {
  title: "Social/SocialIcons",
  component: SocialIcons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SocialIcons>;

export const Default: Story = {
  args: {
    shareUrl: "https://example.com",
  },
};

export const WithTwitterText: Story = {
  args: {
    shareUrl: "https://example.com",
    twitterText: "Check out this site!",
  },
};
