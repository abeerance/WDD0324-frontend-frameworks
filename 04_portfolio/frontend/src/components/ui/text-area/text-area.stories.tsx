import type { Meta, StoryObj } from "@storybook/nextjs";
import { Textarea } from "./text-area";

const meta = {
  title: "Components / Form / Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default textarea
 */
export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
  },
};

/**
 * With content
 */
export const WithContent: Story = {
  args: {
    value:
      "This is a textarea with some content already filled in. It can hold multiple lines of text.",
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
    value: "Cannot edit this content",
  },
};

/**
 * Invalid state
 */
export const Invalid: Story = {
  args: {
    value: "Invalid content",
    "aria-invalid": "true",
  },
};

/**
 * Valid state
 */
export const Valid: Story = {
  args: {
    value: "Valid content here",
    "aria-invalid": "false",
  },
};
