import type { Preview } from "@storybook/nextjs";
import "../src/styles/globals.css";

/**
 * Storybook Preview Configuration
 *
 * This file configures global settings that apply to ALL stories across the entire Storybook.
 * It's the central place to define shared parameters, decorators, and global behavior.
 */
const preview: Preview = {
  /**
   * Global parameters applied to every story
   * These settings provide consistent behavior and UI across all component stories
   */
  parameters: {
    /**
     * Controls panel configuration
     * Defines how Storybook automatically generates interactive controls for component props
     */
    controls: {
      /**
       * Matchers object - tells Storybook how to identify specific prop types
       * and render appropriate controls in the Controls panel
       */
      matchers: {
        /**
         * Color prop matcher
         * Any prop name containing "background" or "color" (case-insensitive)
         * will automatically get a color picker control in the Controls panel
         *
         * Examples: backgroundColor, textColor, borderColor, etc.
         */
        color: /(background|color)$/i,

        /**
         * Date prop matcher
         * Any prop name ending with "Date" (case-insensitive)
         * will automatically get a date picker control in the Controls panel
         *
         * Examples: createdDate, publishDate, startDate, etc.
         */
        date: /Date$/i,
      },
    },

    /**
     * Additional parameters that could be added:
     *
     * layout: 'centered', // Centers all stories in the Canvas by default
     *
     * backgrounds: {
     *   default: 'light',
     *   values: [
     *     { name: 'light', value: '#ffffff' },
     *     { name: 'dark', value: '#0c0d0e' },
     *   ],
     * },
     *
     * viewport: {
     *   viewports: {
     *     mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' }},
     *     tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' }},
     *     desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' }},
     *   },
     * },
     *
     * docs: {
     *   theme: themes.dark, // Use dark theme for documentation
     * },
     */
  },

  /**
   * Global decorators could be added here:
   *
   * decorators: [
   *   // Wrap all stories with a theme provider
   *   (Story) => (
   *     <div className="min-h-screen bg-background text-foreground">
   *       <Story />
   *     </div>
   *   ),
   * ],
   */
};

export default preview;
