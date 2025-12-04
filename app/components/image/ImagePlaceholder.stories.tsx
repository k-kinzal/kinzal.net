import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";

function ImagePlaceholderWrapper(props: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return <ImagePlaceholder containerRef={ref} {...props} />;
}

const meta: Meta<typeof ImagePlaceholderWrapper> = {
  title: "Image/ImagePlaceholder",
  component: ImagePlaceholderWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "200px", height: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImagePlaceholderWrapper>;

export const Default: Story = {
  args: {},
};

export const WithClassName: Story = {
  args: {
    className: "rounded-lg",
  },
};
