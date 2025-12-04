import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Data Display/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual variant",
      control: { type: "select" },
      options: ["default", "outline", "ghost"],
    },
    padding: {
      description: "Padding size",
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="mb-2 text-lg font-bold">Card Title</h3>
        <p className="text-foreground-muted">Card content goes here.</p>
      </div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card variant="default" className="w-48">
        <p className="font-medium">Default</p>
        <p className="text-foreground-muted text-sm">With shadow</p>
      </Card>
      <Card variant="outline" className="w-48">
        <p className="font-medium">Outline</p>
        <p className="text-foreground-muted text-sm">With border</p>
      </Card>
      <Card variant="ghost" className="w-48">
        <p className="font-medium">Ghost</p>
        <p className="text-foreground-muted text-sm">Transparent</p>
      </Card>
    </div>
  ),
};

export const NoPadding: Story = {
  args: {
    variant: "outline",
    padding: "none",
    children: (
      <>
        <div className="bg-background-muted h-32 rounded-t-lg" />
        <div className="p-4">
          <p className="font-medium">Image Card</p>
          <p className="text-foreground-muted text-sm">With no padding</p>
        </div>
      </>
    ),
  },
};

/**
 * Compound component pattern for structured card layouts.
 * Use Card.Header, Card.Body, and Card.Footer for consistent spacing.
 */
export const Compound: Story = {
  render: () => (
    <Card padding="none" className="w-72">
      <Card.Header>
        <h3 className="text-lg font-bold">Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-foreground-muted">
          This is the main content area. Use Card.Body for the primary content of your card.
        </p>
      </Card.Body>
      <Card.Footer>
        <button className="bg-primary rounded px-3 py-1.5 text-sm text-white">Action</button>
        <button className="text-foreground-muted px-3 py-1.5 text-sm">Cancel</button>
      </Card.Footer>
    </Card>
  ),
};

/**
 * Multiple compound cards in a grid layout.
 */
export const CompoundGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {["Project A", "Project B", "Project C", "Project D"].map((title) => (
        <Card key={title} padding="none" variant="outline" className="w-48">
          <Card.Header>
            <h4 className="font-semibold">{title}</h4>
          </Card.Header>
          <Card.Body>
            <p className="text-foreground-muted text-sm">Description for {title.toLowerCase()}.</p>
          </Card.Body>
          <Card.Footer>
            <span className="text-foreground-muted text-xs">Updated today</span>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
};
