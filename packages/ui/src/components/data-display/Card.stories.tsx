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
        <h3 className="font-bold text-lg mb-2">Card Title</h3>
        <p className="text-foreground-muted">
          Card content goes here.
        </p>
      </div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card variant="default" className="w-48">
        <p className="font-medium">Default</p>
        <p className="text-sm text-foreground-muted">With shadow</p>
      </Card>
      <Card variant="outline" className="w-48">
        <p className="font-medium">Outline</p>
        <p className="text-sm text-foreground-muted">With border</p>
      </Card>
      <Card variant="ghost" className="w-48">
        <p className="font-medium">Ghost</p>
        <p className="text-sm text-foreground-muted">Transparent</p>
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
        <div className="h-32 bg-background-muted rounded-t-lg" />
        <div className="p-4">
          <p className="font-medium">Image Card</p>
          <p className="text-sm text-foreground-muted">With no padding</p>
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
        <h3 className="font-bold text-lg">Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-foreground-muted">
          This is the main content area. Use Card.Body for the primary content
          of your card.
        </p>
      </Card.Body>
      <Card.Footer>
        <button className="px-3 py-1.5 text-sm bg-primary text-white rounded">
          Action
        </button>
        <button className="px-3 py-1.5 text-sm text-foreground-muted">
          Cancel
        </button>
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
            <p className="text-sm text-foreground-muted">
              Description for {title.toLowerCase()}.
            </p>
          </Card.Body>
          <Card.Footer>
            <span className="text-xs text-foreground-muted">Updated today</span>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
};
