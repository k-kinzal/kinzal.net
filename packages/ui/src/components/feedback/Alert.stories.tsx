import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Alert type",
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: "This is an informational message.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Alert variant="info">This is an info alert.</Alert>
      <Alert variant="success">Operation completed successfully!</Alert>
      <Alert variant="warning">Please review before continuing.</Alert>
      <Alert variant="error">An error occurred. Please try again.</Alert>
    </div>
  ),
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Your changes have been saved.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Failed to load data. Please refresh the page.",
  },
};
