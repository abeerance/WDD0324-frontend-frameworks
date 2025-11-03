import { loginAction } from "@/actions/auth/login-action";
import { FormControl } from "@/components/ui/form/form-control";
import { FormField } from "@/components/ui/form/form-field";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormMessage } from "@/components/ui/form/form-message";
import { FormRoot } from "@/components/ui/form/form-root";
import { FormSubmit } from "@/components/ui/form/form-submit";
import { Input } from "@/components/ui/input/input";
import { TextLink } from "@/components/ui/text-link/text-link";
import { Text } from "@/components/ui/text/text";
import { type LoginFormData, loginSchema } from "@/schemas/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface LoginFormProps {
	setFormState: () => void;
}

export const LoginForm = ({ setFormState }: LoginFormProps) => {
	const router = useRouter();

	// Initialize React Hook Form with Zod validation schema
	const {
		register, // Connects input fields to form state
		handleSubmit, // Wraps our submit function with validation
		formState: { errors }, // Contains validation errors
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema), // Uses Zod for validation rules
	});

	// Stores server-side error messages (e.g., invalid credentials)
	const [errorMessage, setErrorMessage] = useState("");

	/**
	 * Form submission handler
	 *
	 * Called after React Hook Form validates the data client-side.
	 * Converts form data to FormData format and calls server action.
	 *
	 * @param data - Validated form data from React Hook Form
	 */
	const onSubmit = async (data: LoginFormData) => {
		// Clear any previous error messages
		setErrorMessage("");

		// Convert to FormData format for server action
		const formData = new FormData();
		formData.append("username", data.username);
		formData.append("password", data.password);

		// Call server action to authenticate with Laravel API
		const result = await loginAction(formData);

		// Handle authentication result
		if (result?.error) {
			// Display error to user if login failed
			setErrorMessage(result.error);
			toast.error(errorMessage);
		} else {
			toast.success("Login successful");
			// Redirect to dashboard on successful login
			router.push("/dashboard");
		}
	};

	return (
		<FormRoot onSubmit={handleSubmit(onSubmit)}>
			{/* Username Field */}
			<FormField
				name="username"
				serverInvalid={!!errors.username} // Tells Radix UI this field has a validation error
			>
				<FormLabel>Username</FormLabel>
				{/* Display validation error message if present */}
				{errors.username && (
					<FormMessage>{errors.username.message}</FormMessage>
				)}
				<FormControl>
					<Input
						type="text"
						placeholder="Enter Username"
						{...register("username")} // Connects input to React Hook Form state
					/>
				</FormControl>
			</FormField>

			{/* Password Field */}
			<FormField
				name="password"
				serverInvalid={!!errors.password} // Tells Radix UI this field has a validation error
			>
				<FormLabel>Password</FormLabel>
				{/* Display validation error message if present */}
				{errors.password && (
					<FormMessage>{errors.password.message}</FormMessage>
				)}
				<FormControl>
					<Input
						type="password"
						placeholder="Enter Password"
						{...register("password")} // Connects input to React Hook Form state
					/>
				</FormControl>
			</FormField>
			<div className="flex gap-[2px] -mt-m justify-end">
				<Text>Need an account?</Text>
				<TextLink onClick={setFormState}>Register now!</TextLink>
			</div>
			{/* Submit Button */}
			<FormSubmit buttonClassName="w-full">Login</FormSubmit>
		</FormRoot>
	);
};
