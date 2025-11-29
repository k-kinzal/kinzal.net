import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./AspectRatio";
import { Image } from "./Image";

const meta: Meta<typeof AspectRatio> = {
  title: "Media/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: "select",
      options: ["square", "video", "portrait", "wide"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

const placeholderImage = "https://picsum.photos/400/400";

export const Square: Story = {
  args: {
    ratio: "square",
    className: "w-48 bg-background-muted",
    children: (
      <Image
        src={placeholderImage}
        alt="Square image"
        className="w-full h-full"
      />
    ),
  },
};

export const Video: Story = {
  args: {
    ratio: "video",
    className: "w-64 bg-background-muted",
    children: (
      <Image
        src="https://picsum.photos/640/360"
        alt="Video aspect image"
        className="w-full h-full"
      />
    ),
  },
};

export const Portrait: Story = {
  args: {
    ratio: "portrait",
    className: "w-48 bg-background-muted",
    children: (
      <Image
        src="https://picsum.photos/300/400"
        alt="Portrait image"
        className="w-full h-full"
      />
    ),
  },
};

export const Wide: Story = {
  args: {
    ratio: "wide",
    className: "w-64 bg-background-muted",
    children: (
      <Image
        src="https://picsum.photos/630/270"
        alt="Wide image"
        className="w-full h-full"
      />
    ),
  },
};

export const AllRatios: Story = {
  render: () => (
    <div className="flex gap-4 items-start">
      <div className="text-center">
        <AspectRatio ratio="square" className="w-24 bg-background-muted">
          <Image
            src={placeholderImage}
            alt="Square"
            className="w-full h-full"
          />
        </AspectRatio>
        <span className="text-sm">Square (1:1)</span>
      </div>
      <div className="text-center">
        <AspectRatio ratio="video" className="w-32 bg-background-muted">
          <Image
            src="https://picsum.photos/640/360"
            alt="Video"
            className="w-full h-full"
          />
        </AspectRatio>
        <span className="text-sm">Video (16:9)</span>
      </div>
      <div className="text-center">
        <AspectRatio ratio="portrait" className="w-24 bg-background-muted">
          <Image
            src="https://picsum.photos/300/400"
            alt="Portrait"
            className="w-full h-full"
          />
        </AspectRatio>
        <span className="text-sm">Portrait (3:4)</span>
      </div>
    </div>
  ),
};
