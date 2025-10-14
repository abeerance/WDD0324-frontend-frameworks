import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./input";

const meta = {
  title: "Components/Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input with text type
 */
export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
};

/**
 * Email input with validation
 */
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
};

/**
 * Password input
 */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "Disabled input",
    disabled: true,
    value: "Cannot edit this",
  },
};

/**
 * With value
 */
export const WithValue: Story = {
  args: {
    type: "text",
    value: "Filled input",
  },
};

/**
 * Invalid state (requires aria-invalid attribute)
 */
export const Invalid: Story = {
  args: {
    type: "email",
    value: "invalid-email",
    "aria-invalid": "true",
  },
};

/**
 * Valid state
 */
export const Valid: Story = {
  args: {
    type: "email",
    value: "valid@example.com",
    "aria-invalid": "false",
  },
};
