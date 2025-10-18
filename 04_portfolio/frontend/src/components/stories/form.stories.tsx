import type { Meta, StoryObj } from "@storybook/nextjs";
import { Grid, GridItem } from "../layout/grid/grid";
import { FormControl } from "../ui/form/form-control";
import { FormField } from "../ui/form/form-field";
import { FormLabel } from "../ui/form/form-label";
import { FormMessage } from "../ui/form/form-message";
import { FormRoot } from "../ui/form/form-root";
import { FormSubmit } from "../ui/form/form-submit";
import { Input } from "../ui/input/input";
import { Textarea } from "../ui/text-area/text-area";
import { Text } from "../ui/text/text";

/**
 * Contact Form Demo Component
 *
 * Demonstrates a complete form implementation using:
 * - Radix UI Form primitives for validation and accessibility
 * - Design system components (Input, Textarea, Button, Text)
 * - Grid layout system for responsive centering
 * - OKLCH color system for consistent styling
 *
 * This form showcases:
 * 1. Client-side validation using browser Constraint Validation API
 * 2. Automatic error message display/hide based on field state
 * 3. Accessible form structure with proper ARIA attributes
 * 4. Responsive layout using 12-column grid system
 * 5. Design system integration (colors, typography, spacing)
 *
 * Form validation behavior:
 * - Try submitting empty: All required fields show errors
 * - Fill name only: Email and message errors remain
 * - Invalid email: Shows "Please enter a valid email"
 * - All valid: Form submits and shows alert with data
 *
 * Layout structure:
 * - Grid: 12-column container with max-width 1440px
 * - GridItem span={6}: Takes 6 columns (half width)
 * - GridItem offset={3}: Centered (skip 3 columns, 6 content, 3 remaining)
 * - This creates a centered form on desktop, full width on mobile
 */
function ContactFormDemo() {
	return (
		// Grid container with 12 columns
		<Grid>
			{/*
        Centered grid item:
        - span={6}: Occupies 6 out of 12 columns (50% width)
        - offset={3}: Starts at column 4 (skips first 3 columns)
        - Result: Horizontally centered form container

        Styling:
        - rounded-lg: Large border radius for modern look
        - px-m: Medium horizontal padding (fluid spacing token)
        - pt-s: Small top padding
        - pb-m: Medium bottom padding
      */}
			<GridItem
				span={6}
				offset={3}
				className="w-full rounded-lg px-m pt-s pb-m"
			>
				{/*
          Form heading using Text component
          - variant="headline-4": Medium heading size from typography scale
          - mb-2xs: Extra small bottom margin for tight spacing to form
        */}
				<Text variant="headline-4" className="mb-2xs">
					Contact Us
				</Text>

				{/*
          FormRoot: Main form container

          Handles form submission:
          1. Prevents default browser submission (e.preventDefault())
          2. Extracts form data using FormData API
          3. Converts to plain object with Object.fromEntries()
          4. Displays data in alert (in production, would send to API)

          Form data structure:
          {
            name: "John Doe",
            email: "john@example.com",
            message: "Hello world"
          }

          Each field's "name" prop becomes a key in this object
        */}
				<FormRoot
					className="space-y-l" // Large vertical spacing between fields
					onSubmit={(e) => {
						// Prevent default browser form submission
						e.preventDefault();

						// Extract form data from the form element
						const formData = new FormData(e.currentTarget);

						// Convert FormData to plain JavaScript object
						// Each field's name attribute becomes a key
						const data = Object.fromEntries(formData);

						// Display submitted data (in production, send to API)
						alert(`Form submitted!\n\n${JSON.stringify(data, null, 2)}`);
					}}
				>
					{/*
            Name Field

            Field structure:
            - FormField: Creates validation context, wires label/input/messages
            - FormLabel: Displays "Name" label, connected to input via htmlFor
            - FormMessage: Error message, shows only when validation fails
            - FormControl: Wraps Input, adds validation attributes
            - Input: Actual input element with styling

            Validation:
            - required attribute triggers "valueMissing" validation
            - If empty on submit, shows "Please enter your name"
            - Message positioned absolutely below input
          */}
					<FormField name="name">
						{/*
              Label automatically gets htmlFor="name"
              Clicking label focuses the input
            */}
						<FormLabel>Name</FormLabel>

						{/*
              Error message for empty field
              match="valueMissing": Shows when required field is empty
              Positioned absolutely below input via FormMessage styling
            */}
						<FormMessage match="valueMissing">
							Please enter your name
						</FormMessage>

						{/*
              Input wrapper that adds validation attributes
              FormControl passes aria-invalid, aria-describedby to Input
            */}
						<FormControl>
							<Input
								type="text"
								placeholder="John Doe"
								required // Triggers valueMissing validation
							/>
						</FormControl>
					</FormField>

					{/*
            Email Field

            Additional validation:
            - typeMismatch: Validates email format (must contain @)
            - Shows different error messages based on validation type

            Email validation types:
            1. Empty field: "Please enter your email" (valueMissing)
            2. Invalid format: "Please enter a valid email" (typeMismatch)

            Browser validates email format automatically when type="email"
          */}
					<FormField name="email">
						<FormLabel>Email</FormLabel>

						{/* Error message for empty email field */}
						<FormMessage match="valueMissing">
							Please enter your email
						</FormMessage>

						{/*
              Error message for invalid email format
              Shows when input doesn't match email pattern (missing @, etc.)
              Browser handles email validation via type="email"
            */}
						<FormMessage match="typeMismatch">
							Please enter a valid email
						</FormMessage>

						<FormControl>
							<Input
								type="email" // Enables browser email validation
								placeholder="john@example.com"
								required
							/>
						</FormControl>
					</FormField>

					{/*
            Message Field

            Uses Textarea instead of Input for multi-line content
            Same validation pattern as other fields

            Textarea features:
            - min-h-[120px]: Minimum height for comfortable typing
            - resize-vertical: Users can resize vertically only
            - Same validation styling as Input (border colors, rings)
          */}
					<FormField name="message">
						<FormLabel>Message</FormLabel>

						{/* Error message for empty message field */}
						<FormMessage match="valueMissing">
							Please enter a message
						</FormMessage>

						<FormControl>
							<Textarea placeholder="Your message here..." required />
						</FormControl>
					</FormField>

					{/*
            Submit Button

            FormSubmit component:
            - Wraps Button with Radix Form.Submit functionality
            - Triggers validation on all fields before submission
            - Only calls onSubmit if all validations pass
            - Handles Enter key press for submission

            Submission flow:
            1. User clicks button (or presses Enter)
            2. Radix validates all required fields
            3. If any invalid: shows errors, focuses first invalid field
            4. If all valid: calls FormRoot's onSubmit handler

            The button automatically gets:
            - type="submit" attribute
            - Validation triggering on click
            - Disabled state handling (if configured)
          */}
					<FormSubmit>Send Message</FormSubmit>
				</FormRoot>
			</GridItem>
		</Grid>
	);
}

/**
 * Storybook Meta Configuration
 *
 * Defines how this story appears in Storybook:
 * - title: Path in Storybook sidebar (Components > Form > ContactForm)
 * - component: The React component to render
 *
 * This creates a dedicated page in Storybook to showcase the form
 */
const meta = {
	title: "Components/Form/ContactForm",
	component: ContactFormDemo,
} satisfies Meta<typeof ContactFormDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Story
 *
 * Renders the ContactFormDemo component in Storybook
 *
 * How to use in Storybook:
 * 1. Navigate to Components > Form > ContactForm
 * 2. See the rendered form
 * 3. Interact with the form to test validation
 *
 * Test scenarios:
 * - Click "Send Message" without filling anything
 * - Fill only name, submit again
 * - Enter "invalid" in email field, submit
 * - Enter "test@test" (no TLD) in email, submit
 * - Fill all fields correctly, submit
 *
 * Expected validation behavior:
 * - Empty required fields: Red border + error message
 * - Invalid email format: Red border + "Please enter a valid email"
 * - Valid fields: Green border
 * - All valid: Alert shows submitted data as JSON
 *
 * Visual states to observe:
 * - Default state: Gray borders, no errors
 * - Focus state: Blue ring around input
 * - Invalid state: Red border + red ring + error message
 * - Valid state: Green border
 * - Labels change color based on field state
 */
export const Default: Story = {};
