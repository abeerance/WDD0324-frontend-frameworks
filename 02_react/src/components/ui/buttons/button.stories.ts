import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";

/**
 * Storybook Meta configuration for Button component
 *
 * This object defines the default configuration and metadata for all Button stories.
 * It serves as the foundation that individual stories can extend or override.
 */
const meta = {
  /**
   * Story hierarchy and title in Storybook sidebar
   * Creates nested structure: Components > UI > Button
   * Use " / " separator for folder organization
   */
  title: "Components / UI / Button",

  /**
   * The React component this story file documents
   * Storybook uses this to understand component props and generate controls
   */
  component: Button,

  // parameters: {
  //   /**
  //    * Layout parameter controls component positioning in Canvas
  //    * Options: 'centered', 'fullscreen', 'padded' (default)
  //    * Uncomment to center component in viewport for better visual testing
  //    */
  //   layout: "centered",
  // },

  /**
   * Default arguments applied to ALL stories unless overridden
   * These props will be used as the baseline for every story variant
   * Provides consistent starting point and reduces repetition
   */
  args: {
    children: "Default Text", // Default button text for all variants
  },

  /**
   * Optional: argTypes can be added here to:
   * - Customize control types in the Controls panel
   * - Add descriptions for props
   * - Set validation or constraints
   *
   * Example:
   * argTypes: {
   *   variant: {
   *     control: { type: 'select' },
   *     description: 'Visual style variant for the button'
   *   }
   * }
   */
} satisfies Meta<typeof Button>;

// Export meta as default - required by Storybook
export default meta;

/**
 * TypeScript helper type for story objects
 * Ensures all stories conform to the meta configuration
 * Provides type safety and IntelliSense for story properties
 */
type Story = StoryObj<typeof meta>;

/**
 * Primary Button Story
 * Demonstrates the main call-to-action button style
 * Typically used for the most important action on a page
 */
export const Primary: Story = {
  args: {
    variant: "primary", // Overrides meta.args for this specific story
  },
};

/**
 * Secondary Button Story
 * Shows the secondary action button style
 * Used for less critical actions or alternative choices
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

/**
 * Ghost Button Story
 * Demonstrates the minimal, text-only button style
 * Ideal for subtle actions or when background buttons would be too heavy
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

/**
 * Destructive Button Story
 * Shows the warning/danger button style
 * Used for potentially harmful actions like delete, remove, or cancel
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};
