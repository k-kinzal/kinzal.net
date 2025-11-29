import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Shape variant",
      control: { type: "select" },
      options: ["default", "circular", "text"],
    },
    width: {
      description: "Width of the skeleton",
      control: { type: "text" },
    },
    height: {
      description: "Height of the skeleton",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: 48,
    height: 48,
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    width: "80%",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Default:</span>
        <Skeleton width={120} height={20} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Circular:</span>
        <Skeleton variant="circular" width={40} height={40} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Text:</span>
        <Skeleton variant="text" width="100%" />
      </div>
    </div>
  ),
};

/**
 * Card skeleton showing a common loading pattern.
 */
export const CardSkeleton: Story = {
  render: () => (
    <div className="w-72 p-4 border rounded-lg space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton height={120} />
      <div className="space-y-2">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  ),
};

/**
 * List skeleton for loading lists.
 */
export const ListSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <Skeleton variant="circular" width={32} height={32} />
          <div className="flex-1 space-y-1">
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Avatar with name skeleton.
 */
export const AvatarWithText: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="space-y-2">
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={80} />
      </div>
    </div>
  ),
};
