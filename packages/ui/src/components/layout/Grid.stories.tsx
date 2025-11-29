import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4, 6, 12],
    },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary/10 border border-primary/20 p-4 text-center rounded">
    {children}
  </div>
);

export const TwoColumns: Story = {
  args: {
    cols: 2,
    children: (
      <>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    children: (
      <>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
        <GridItem>5</GridItem>
        <GridItem>6</GridItem>
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    children: (
      <>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
      </>
    ),
  },
};

export const SixColumns: Story = {
  args: {
    cols: 6,
    children: (
      <>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
        <GridItem>5</GridItem>
        <GridItem>6</GridItem>
      </>
    ),
  },
};

export const NoGap: Story = {
  args: {
    cols: 3,
    gap: "none",
    children: (
      <>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
      </>
    ),
  },
};
