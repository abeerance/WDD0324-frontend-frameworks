import { registerAction } from "@/actions/auth/register-action";
import { FormControl } from "@/components/ui/form/form-control";
import { FormField } from "@/components/ui/form/form-field";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormMessage } from "@/components/ui/form/form-message";
import { FormRoot } from "@/components/ui/form/form-root";
import { FormSubmit } from "@/components/ui/form/form-submit";
import { Input } from "@/components/ui/input/input";
import { TextLink } from "@/components/ui/text-link/text-link";
import { Text } from "@/components/ui/text/text";
import {
	type RegisterFormData,
	registerSchema,
} from "@/schemas/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface RegisterFormProps {
	setFormState: () => void;
}

export const RegisterForm = ({ setFormState }: RegisterFormProps) => {
	// Initialize React Hook Form with Zod validation schema
	const {
		register, // Connects input fields to form state
		handleSubmit, // Wraps our submit function with validation
		formState: { errors }, // Contains validation errors
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema), // Uses Zod for validation rules
	});

	const onSubmit = async (data: RegisterFormData) => {
		// Convert validated data to FormData format for server action
		// Server actions expect FormData, not JSON objects
		const formData = new FormData();
		formData.append("firstName", data.firstName);
		formData.append("lastName", data.lastName);
		formData.append("username", data.username);
		formData.append("email", data.email);
		formData.append("password", data.password);
		formData.append("password_confirmation", data.password_confirmation);

		const result = await registerAction(formData);

		// Handle server response - show appropriate toast notification
		if (result?.error) {
			toast.error(result.error);
		} else {
			toast.success("Registration successful! Please login.");
			setFormState();
		}
	};

	return (
		<FormRoot onSubmit={handleSubmit(onSubmit)}>
			<FormField
				name="firstName"
				serverInvalid={!!errors.firstName} // Converts error object to boolean for Radix UI
			>
				<FormLabel>First Name</FormLabel>
				{/* Display validation error message if present */}
				{errors.firstName && (
					<FormMessage>{errors.firstName.message}</FormMessage>
				)}
				<FormControl>
					<Input
						type="text"
						placeholder="Enter First Name"
						{...register("firstName")} // Connects input to React Hook Form state
					/>
				</FormControl>
			</FormField>
			<FormField
				name="lastName"
				serverInvalid={!!errors.lastName} // Tells Radix UI this field has a validation error
			>
				<FormLabel>Last Name</FormLabel>
				{/* Display validation error message if present */}
				{errors.lastName && (
					<FormMessage>{errors.lastName.message}</FormMessage>
				)}
				<FormControl>
					<Input
						type="text"
						placeholder="Enter Last Name"
						{...register("lastName")} // Connects input to React Hook Form state
					/>
				</FormControl>
			</FormField>
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
			<FormField
				name="email"
				serverInvalid={!!errors.email} // Tells Radix UI this field has a validation error
			>
				<FormLabel>E-Mail</FormLabel>
				{/* Display validation error message if present */}
				{errors.email && <FormMessage>{errors.email.message}</FormMessage>}
				<FormControl>
					<Input
						type="text"
						placeholder="Enter E-Mail"
						{...register("email")} // Connects input to React Hook Form state
					/>
				</FormControl>
			</FormField>
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
			<FormField
				name="password_confirmation"
				serverInvalid={!!errors.password_confirmation} // Tells Radix UI this field has a validation error
			>
				<FormLabel>Password Confirmation</FormLabel>
				{/* Display validation error message if present */}
				{errors.password_confirmation && (
					<FormMessage>{errors.password_confirmation.message}</FormMessage>
				)}
				<FormControl>
					<Input
						type="password"
						placeholder="Confirm your password"
						{...register("password_confirmation")} // Connects input to React Hook Form state
					/>
				</FormControl>
			</FormField>
			<div className="flex gap-0.5 -mt-m justify-end">
				<Text>Already got an account?</Text>
				<TextLink onClick={setFormState}>Login now!</TextLink>
			</div>
			<FormSubmit buttonClassName="w-full">Register</FormSubmit>
		</FormRoot>
	);
};
