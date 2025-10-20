"use client";

import { FormControl } from "@/components/ui/form/form-control";
import { FormField } from "@/components/ui/form/form-field";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormMessage } from "@/components/ui/form/form-message";
import { FormRoot } from "@/components/ui/form/form-root";
import { FormSubmit } from "@/components/ui/form/form-submit";
import { Input } from "@/components/ui/input/input";
import { type LoginFormData, loginSchema } from "@/schemas/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const AuthForm = () => {
	// initialize react-hook-form with Zod validation
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormData) => {
		console.log(data);
	};

	return (
		<FormRoot onSubmit={handleSubmit(onSubmit)}>
			<FormField
				name="username"
				serverInvalid={!!errors.username} // Tells Radix: This field has an error
			>
				<FormLabel>Username</FormLabel>
				{/* show error message if validation fails */}
				{errors.username && (
					<FormMessage>{errors.username.message}</FormMessage>
				)}
				<FormControl>
					<Input
						type="text"
						placeholder="Enter Username"
						{...register("username")} // Connects input to react-hook-form
					/>
				</FormControl>
			</FormField>
			<FormField
				name="password"
				serverInvalid={!!errors.password} // Tells Radix: This field has an error
			>
				<FormLabel>Password</FormLabel>
				{/* show error message if validation fails */}
				{errors.password && (
					<FormMessage>{errors.password.message}</FormMessage>
				)}
				<FormControl>
					<Input
						type="password"
						placeholder="Enter Password"
						{...register("password")} // Connects input to react-hook-form
					/>
				</FormControl>
			</FormField>
			<FormSubmit buttonClassName="w-full">Login</FormSubmit>
		</FormRoot>
	);
};
