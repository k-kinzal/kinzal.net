import type { Meta, StoryObj } from "@storybook/react";
import { OptimizedImage } from "./OptimizedImage";

const meta: Meta<typeof OptimizedImage> = {
  title: "Image/OptimizedImage",
  component: OptimizedImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["thumb-sm", "thumb-md", "thumb-lg", "face", "full"],
    },
    objectFit: {
      control: "select",
      options: ["contain", "cover"],
    },
    category: {
      control: "select",
      options: ["original", "scrap"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof OptimizedImage>;

export const ThumbnailSmall: Story = {
  args: {
    category: "original",
    filename: "img001.jpg",
    variant: "thumb-sm",
  },
};

export const ThumbnailMedium: Story = {
  args: {
    category: "original",
    filename: "img001.jpg",
    variant: "thumb-md",
  },
};

export const ThumbnailLarge: Story = {
  args: {
    category: "original",
    filename: "img001.jpg",
    variant: "thumb-lg",
  },
};

export const FullSize: Story = {
  args: {
    category: "original",
    filename: "img001.jpg",
    variant: "full",
    objectFit: "contain",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "800px", height: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Priority: Story = {
  args: {
    category: "original",
    filename: "img001.jpg",
    variant: "thumb-md",
    priority: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Priority images load immediately without lazy loading.",
      },
    },
  },
};

export const ScrapImage: Story = {
  args: {
    category: "scrap",
    filename: "img001.jpg",
    variant: "thumb-md",
  },
};

export const WithCustomClass: Story = {
  args: {
    category: "original",
    filename: "img001.jpg",
    variant: "thumb-md",
    className: "rounded-lg shadow-lg",
  },
};
