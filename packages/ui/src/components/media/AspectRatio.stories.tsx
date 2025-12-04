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
    children: <Image src={placeholderImage} alt="Square image" className="h-full w-full" />,
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
        className="h-full w-full"
      />
    ),
  },
};

export const Portrait: Story = {
  args: {
    ratio: "portrait",
    className: "w-48 bg-background-muted",
    children: (
      <Image src="https://picsum.photos/300/400" alt="Portrait image" className="h-full w-full" />
    ),
  },
};

export const Wide: Story = {
  args: {
    ratio: "wide",
    className: "w-64 bg-background-muted",
    children: (
      <Image src="https://picsum.photos/630/270" alt="Wide image" className="h-full w-full" />
    ),
  },
};

export const AllRatios: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <div className="text-center">
        <AspectRatio ratio="square" className="bg-background-muted w-24">
          <Image src={placeholderImage} alt="Square" className="h-full w-full" />
        </AspectRatio>
        <span className="text-sm">Square (1:1)</span>
      </div>
      <div className="text-center">
        <AspectRatio ratio="video" className="bg-background-muted w-32">
          <Image src="https://picsum.photos/640/360" alt="Video" className="h-full w-full" />
        </AspectRatio>
        <span className="text-sm">Video (16:9)</span>
      </div>
      <div className="text-center">
        <AspectRatio ratio="portrait" className="bg-background-muted w-24">
          <Image src="https://picsum.photos/300/400" alt="Portrait" className="h-full w-full" />
        </AspectRatio>
        <span className="text-sm">Portrait (3:4)</span>
      </div>
    </div>
  ),
};
