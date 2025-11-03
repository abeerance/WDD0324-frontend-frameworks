"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

// initialize an enum, in which we can predictably control which formSate the form should have, either login or register
enum FormState {
	Login = "login",
	Register = "register",
}

export const AuthForm = () => {
	// here we use a useState to change the formState to either login or register, the default value will be the login
	const [formState, setFormState] = useState<FormState>(FormState.Login);

	return formState === FormState.Login ? (
		<LoginForm setFormState={() => setFormState(FormState.Register)} />
	) : (
		<RegisterForm setFormState={() => setFormState(FormState.Login)} />
	);
};
