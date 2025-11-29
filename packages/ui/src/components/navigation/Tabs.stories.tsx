import type { Meta, StoryObj } from "@storybook/react";
import { TabList, TabItem, TabPillItem } from "./Tabs";

const meta: Meta<typeof TabList> = {
  title: "Navigation/Tabs",
  component: TabList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual variant",
      control: { type: "select" },
      options: ["default", "pills"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabList>;

export const Default: Story = {
  render: () => (
    <TabList>
      <TabItem active>Overview</TabItem>
      <TabItem>Features</TabItem>
      <TabItem>Pricing</TabItem>
      <TabItem>FAQ</TabItem>
    </TabList>
  ),
};

export const Pills: Story = {
  render: () => (
    <TabList variant="pills">
      <TabPillItem active>All</TabPillItem>
      <TabPillItem>Original</TabPillItem>
      <TabPillItem>Scrap</TabPillItem>
    </TabList>
  ),
};

export const SecondActive: Story = {
  render: () => (
    <TabList>
      <TabItem>Tab 1</TabItem>
      <TabItem active>Tab 2</TabItem>
      <TabItem>Tab 3</TabItem>
    </TabList>
  ),
};
