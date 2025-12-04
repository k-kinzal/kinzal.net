import type { Meta, StoryObj } from "@storybook/react";
import { ImageGallery } from "./ImageGallery";

const meta: Meta<typeof ImageGallery> = {
  title: "Gallery/ImageGallery",
  component: ImageGallery,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

const sampleImages = [
  "img001.jpg",
  "img002.jpg",
  "img003.jpg",
  "img004.jpg",
  "img005.jpg",
  "img006.jpg",
];

export const Original: Story = {
  args: {
    images: sampleImages,
    category: "original",
    initialSelectedImage: "",
  },
};

export const Scrap: Story = {
  args: {
    images: ["img001.jpg", "img002.jpg", "img003.jpg"],
    category: "scrap",
    initialSelectedImage: "",
  },
};

export const Empty: Story = {
  args: {
    images: [],
    category: "original",
    initialSelectedImage: "",
  },
};
