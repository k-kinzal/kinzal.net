import type { Meta, StoryObj } from "@storybook/react";
import { NavBrand } from "./NavBrand";

const meta: Meta<typeof NavBrand> = {
  title: "Navigation/NavBrand",
  component: NavBrand,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      description: "The URL the brand links to",
      control: "text",
    },
    children: {
      description: "The brand name or logo content",
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background flex h-16 items-center px-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavBrand>;

export const Default: Story = {
  args: {
    href: "/",
    className: "text-xl font-bold",
    children: "Brand",
  },
};

export const WithBorder: Story = {
  args: {
    href: "/",
    className: "border-l-4 border-l-primary pl-4 text-xl font-bold",
    children: "Brand",
  },
};

export const WithoutBorder: Story = {
  args: {
    href: "/",
    className: "text-xl font-bold",
    children: "Brand",
  },
};

export const WithLogo: Story = {
  args: {
    href: "/",
    children: (
      <span className="flex items-center gap-2">
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="font-bold">Brand</span>
      </span>
    ),
  },
};
