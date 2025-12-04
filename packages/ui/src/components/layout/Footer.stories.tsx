import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import { Stack } from "../layout/Stack";
import { IconButton } from "../primitives/IconButton";
import { Icon } from "../primitives/Icon";
import { Twitter, Facebook } from "lucide-react";

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      description: "Position of the footer",
      control: "select",
      options: ["static", "fixed", "sticky"],
      table: {
        defaultValue: { summary: "static" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    className: "h-12 px-4",
    children: (
      <Stack direction="horizontal" justify="between" align="center" className="h-full w-full">
        <Stack direction="horizontal" gap="sm">
          <IconButton variant="primary" size="sm" aria-label="Twitter">
            <Icon icon={Twitter} size={16} />
          </IconButton>
          <IconButton variant="primary" size="sm" aria-label="Facebook">
            <Icon icon={Facebook} size={16} />
          </IconButton>
        </Stack>
        <span className="text-foreground text-sm">&copy; 2024, example.com</span>
      </Stack>
    ),
  },
};

export const Fixed: Story = {
  args: {
    position: "fixed",
    className: "h-12 px-4",
    children: (
      <Stack direction="horizontal" justify="center" align="center" className="h-full w-full">
        <span className="text-foreground text-sm">Fixed footer</span>
      </Stack>
    ),
  },
};

export const SimpleFooter: Story = {
  args: {
    className: "h-12 px-4",
    children: (
      <Stack direction="horizontal" justify="center" align="center" className="h-full w-full">
        <span className="text-foreground-muted text-sm">Made with love</span>
      </Stack>
    ),
  },
};
