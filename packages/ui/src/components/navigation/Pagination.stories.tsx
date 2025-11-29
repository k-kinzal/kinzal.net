import type { Meta, StoryObj } from "@storybook/react";
import { Pagination, PaginationItem, PaginationEllipsis } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationItem disabled>Previous</PaginationItem>
      <PaginationItem active>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
      <PaginationItem>3</PaginationItem>
      <PaginationItem>Next</PaginationItem>
    </Pagination>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationItem disabled>Previous</PaginationItem>
      <PaginationItem>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
      <PaginationItem active>3</PaginationItem>
      <PaginationItem>4</PaginationItem>
      <PaginationItem>5</PaginationItem>
      <PaginationEllipsis />
      <PaginationItem>20</PaginationItem>
      <PaginationItem>Next</PaginationItem>
    </Pagination>
  ),
};

export const LastPage: Story = {
  render: () => (
    <Pagination>
      <PaginationItem>Previous</PaginationItem>
      <PaginationItem>1</PaginationItem>
      <PaginationEllipsis />
      <PaginationItem>8</PaginationItem>
      <PaginationItem>9</PaginationItem>
      <PaginationItem active>10</PaginationItem>
      <PaginationItem disabled>Next</PaginationItem>
    </Pagination>
  ),
};
