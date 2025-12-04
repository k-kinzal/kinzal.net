import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import { NavBrand } from "./NavBrand";
import { NavLink } from "./NavLink";

const meta: Meta<typeof Navbar> = {
  title: "Navigation/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      description: "Position of the navbar",
      control: "select",
      options: ["static", "fixed", "sticky"],
      table: {
        defaultValue: { summary: "static" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    className: "h-16 px-4",
    children: (
      <div className="flex h-full items-center justify-between">
        <NavBrand href="/" className="text-xl font-bold">
          Brand
        </NavBrand>
        <nav className="flex items-center gap-1">
          <NavLink href="#" active className="px-4 py-2">
            Home
          </NavLink>
          <NavLink href="#" className="px-4 py-2">
            About
          </NavLink>
          <NavLink href="#" className="px-4 py-2">
            Contact
          </NavLink>
        </nav>
      </div>
    ),
  },
};

export const Fixed: Story = {
  args: {
    position: "fixed",
    className: "h-16 px-4",
    children: (
      <div className="flex h-full items-center justify-between">
        <NavBrand href="/" className="text-xl font-bold">
          Brand
        </NavBrand>
        <nav className="flex items-center gap-1">
          <NavLink href="#" active className="px-4 py-2">
            Home
          </NavLink>
          <NavLink href="#" className="px-4 py-2">
            About
          </NavLink>
        </nav>
      </div>
    ),
  },
};

export const Sticky: Story = {
  args: {
    position: "sticky",
    className: "h-16 px-4",
    children: (
      <div className="flex h-full items-center justify-between">
        <NavBrand href="/" className="text-xl font-bold">
          Brand
        </NavBrand>
        <nav className="flex items-center gap-1">
          <NavLink href="#" className="px-4 py-2">
            Link 1
          </NavLink>
          <NavLink href="#" className="px-4 py-2">
            Link 2
          </NavLink>
        </nav>
      </div>
    ),
  },
};
