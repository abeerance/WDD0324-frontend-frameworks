import type { Meta, StoryObj } from "@storybook/nextjs";
import { Text } from "./text";

/**
 * Storybook Meta configuration for Text component
 *
 * Defines the baseline configuration for all Text component stories.
 * This includes default props, story organization, and shared settings.
 */
const meta = {
  /**
   * Story location in Storybook sidebar navigation
   * Creates hierarchy: Components > UI > Text
   * Groups with other UI components for easy discovery
   */
  title: "Components / UI / Text",

  /**
   * The Text component being documented
   * Storybook analyzes this to generate automatic controls and documentation
   */
  component: Text,

  /**
   * Default props applied to all stories
   * Provides consistent baseline content for visual testing
   * Individual stories can override these values as needed
   */
  args: {
    children: "Default Text", // Sample text content for all variants
  },
} satisfies Meta<typeof Text>;

// Required default export for Storybook to recognize this file
export default meta;

/**
 * Type helper for story objects
 * Ensures type safety and IntelliSense for all story configurations
 * Inherits prop types from the Text component
 */
type Story = StoryObj<typeof meta>;

/**
 * Primary/Default Text Story
 * Shows the component with default settings (body variant, p element)
 * Serves as the baseline example for the Text component
 */
export const Primary: Story = {};
