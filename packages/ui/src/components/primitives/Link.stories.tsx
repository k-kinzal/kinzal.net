import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Primitives/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "nav"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "Primary Link",
    href: "#",
    variant: "primary",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Link",
    href: "#",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Link",
    href: "#",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Link",
    href: "#",
    variant: "ghost",
  },
};

export const Nav: Story = {
  args: {
    children: "Nav Link",
    href: "#",
    variant: "nav",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Link href="#" variant="primary">
        Primary
      </Link>
      <Link href="#" variant="secondary">
        Secondary
      </Link>
      <Link href="#" variant="ghost">
        Ghost
      </Link>
      <Link href="#" variant="nav">
        Nav
      </Link>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Link href="#" size="sm">
        Small
      </Link>
      <Link href="#" size="md">
        Medium
      </Link>
      <Link href="#" size="lg">
        Large
      </Link>
    </div>
  ),
};
