import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./Image";

const meta: Meta<typeof Image> = {
  title: "Media/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    alt: {
      control: "text",
      description: "Required for accessibility. Describes the image content.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "required" },
      },
    },
    objectFit: {
      control: "select",
      options: ["contain", "cover", "fill", "none", "scale-down"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

const placeholderImage = "https://picsum.photos/400/300";

export const Default: Story = {
  args: {
    src: placeholderImage,
    alt: "Placeholder image",
    className: "w-64 h-48",
  },
};

export const Cover: Story = {
  args: {
    src: placeholderImage,
    alt: "Cover image",
    objectFit: "cover",
    className: "w-64 h-48",
  },
};

export const Contain: Story = {
  args: {
    src: placeholderImage,
    alt: "Contain image",
    objectFit: "contain",
    className: "w-64 h-48 bg-background-muted",
  },
};

export const LazyLoading: Story = {
  args: {
    src: placeholderImage,
    alt: "Lazy loaded image",
    loading: "lazy",
    className: "w-64 h-48",
  },
};

export const EagerLoading: Story = {
  args: {
    src: placeholderImage,
    alt: "Eager loaded image",
    loading: "eager",
    className: "w-64 h-48",
  },
};
