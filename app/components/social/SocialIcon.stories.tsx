import type { Meta, StoryObj } from "@storybook/react";
import { SocialIcon } from "./SocialIcon";
import { Icon } from "@kinzal-net/ui";
import { Twitter } from "lucide-react";

const meta: Meta<typeof SocialIcon> = {
  title: "Social/SocialIcon",
  component: SocialIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SocialIcon>;

export const Default: Story = {
  args: {
    url: "https://example.com/share",
    windowName: "sharewindow",
    popupWidth: 500,
    popupHeight: 400,
    ariaLabel: "Share on Example",
    bgColor: "bg-blue-500",
    hoverBgColor: "hover:bg-blue-600",
    children: <Icon icon={Twitter} size={16} />,
  },
};
