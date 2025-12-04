import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastProvider, ToastContainer, useToast } from "./Toast";
import { Button } from "../primitives/Button";
import { Stack } from "../layout/Stack";

const meta = {
  title: "Overlay/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Notification",
    description: "This is a default toast notification.",
  },
};

export const Variants: Story = {
  render: () => (
    <Stack gap="md" className="w-80">
      <Toast variant="default" title="Default" description="This is a default notification." />
      <Toast
        variant="success"
        title="Success"
        description="Your changes have been saved successfully."
      />
      <Toast
        variant="warning"
        title="Warning"
        description="Please review your changes before proceeding."
      />
      <Toast variant="error" title="Error" description="Something went wrong. Please try again." />
      <Toast variant="info" title="Info" description="A new version is available for download." />
    </Stack>
  ),
};

export const WithAction: Story = {
  args: {
    title: "File deleted",
    description: "The file has been moved to trash.",
    action: (
      <Button variant="outline" size="sm">
        Undo
      </Button>
    ),
  },
};

export const WithDismiss: Story = {
  args: {
    title: "Dismissable Toast",
    description: "Click the X button to dismiss this toast.",
    onDismiss: () => console.log("Toast dismissed"),
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Changes saved",
    variant: "success",
  },
};

export const LongContent: Story = {
  args: {
    title: "Update Available",
    description:
      "A new software update is available. The update includes bug fixes and performance improvements. Please save your work before updating.",
    action: <Button size="sm">Update</Button>,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Interactive demo with ToastProvider
function ToastDemo() {
  const { addToast, removeAllToasts } = useToast();

  return (
    <Stack gap="sm">
      <Stack direction="horizontal" gap="sm">
        <Button
          onClick={() =>
            addToast({
              title: "Success!",
              description: "Your changes have been saved.",
              variant: "success",
            })
          }
        >
          Success Toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            addToast({
              title: "Warning",
              description: "Please review your input.",
              variant: "warning",
            })
          }
        >
          Warning Toast
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            addToast({
              title: "Error",
              description: "Something went wrong.",
              variant: "error",
            })
          }
        >
          Error Toast
        </Button>
      </Stack>
      <Stack direction="horizontal" gap="sm">
        <Button
          variant="outline"
          onClick={() =>
            addToast({
              title: "With Action",
              description: "This toast has an action button.",
              action: <Button size="sm">Undo</Button>,
              duration: 10000,
            })
          }
        >
          Toast with Action
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            addToast({
              title: "Persistent Toast",
              description: "This toast won't auto-dismiss.",
              duration: 0,
            })
          }
        >
          Persistent Toast
        </Button>
        <Button variant="ghost" onClick={removeAllToasts}>
          Clear All
        </Button>
      </Stack>
    </Stack>
  );
}

export const Interactive: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
      <ToastContainer position="bottom-right" />
    </ToastProvider>
  ),
  parameters: {
    layout: "padded",
  },
};

export const Positions: Story = {
  render: () => {
    function PositionDemo() {
      const { addToast } = useToast();

      return (
        <Stack gap="md">
          <p className="text-foreground-muted text-sm">
            Click buttons to show toasts in different positions
          </p>
          <Stack direction="horizontal" gap="sm" className="flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addToast({ title: "Top Left", variant: "info" })}
            >
              Top Left
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addToast({ title: "Top Center", variant: "info" })}
            >
              Top Center
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addToast({ title: "Top Right", variant: "info" })}
            >
              Top Right
            </Button>
          </Stack>
        </Stack>
      );
    }

    return (
      <ToastProvider>
        <PositionDemo />
        <ToastContainer position="top-left" />
        <ToastContainer position="top-center" />
        <ToastContainer position="top-right" />
      </ToastProvider>
    );
  },
  parameters: {
    layout: "padded",
  },
};
