import type { Meta, StoryObj } from "@storybook/react";
import { NavLink } from "./NavLink";

const meta: Meta<typeof NavLink> = {
  title: "Navigation/NavLink",
  component: NavLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    active: {
      description: "Whether this link is the current page",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    href: {
      description: "The URL the link points to",
      control: "text",
    },
    children: {
      description: "The link text",
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
type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  args: {
    href: "/about",
    className: "px-4 py-2",
    children: "About",
  },
};

export const Active: Story = {
  args: {
    href: "/",
    active: true,
    className: "px-4 py-2",
    children: "Home",
  },
};

export const Inactive: Story = {
  args: {
    href: "/contact",
    active: false,
    className: "px-4 py-2",
    children: "Contact",
  },
};

export const MultipleLinks: Story = {
  render: () => (
    <nav className="flex items-center gap-1">
      <NavLink href="/" active className="px-4 py-2">
        Home
      </NavLink>
      <NavLink href="/about" className="px-4 py-2">
        About
      </NavLink>
      <NavLink href="/gallery" className="px-4 py-2">
        Gallery
      </NavLink>
      <NavLink href="/contact" className="px-4 py-2">
        Contact
      </NavLink>
    </nav>
  ),
};

export const WithCustomClass: Story = {
  args: {
    href: "/custom",
    className: "px-6 py-3 uppercase tracking-wide",
    children: "Custom Style",
  },
};
