import type { Meta, StoryObj } from "@storybook/react";
import { Copyright } from "./Copyright";

const meta: Meta<typeof Copyright> = {
  title: "Brand/Copyright",
  component: Copyright,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Copyright>;

export const Default: Story = {};
