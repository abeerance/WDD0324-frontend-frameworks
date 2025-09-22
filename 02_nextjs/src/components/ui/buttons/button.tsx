"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

// here we create an interface called ButtonProps
// the ButtonProps interface extends the already existing methods and properties of the ButtonHTMLAttributes<HTMLButtonElement>, without that we could not access children, onClick, etc. out of the box
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "ghost" | "destructive"; // here we add the additional property variant, which does not exist yet as a base attribute of a button
}

export const Button = ({
	variant,
	children,
	type = "button",
	className,
	...props
}: ButtonProps) => {
	return (
		<button
			type={type}
			className={cn(
				"rounded-md cursor-pointer inline-flex items-center justify-center px-2 py-1.5 transition-all duration-300",
				variant === "primary" &&
					"bg-cyan-900/90 text-gray-100 hover:bg-cyan-900/75",
				variant === "secondary" &&
					"bg-amber-700/90 text-gray-100 hover:bg-amber-700/75",
				variant === "ghost" && "text-gray-900 underline",
				variant === "destructive" &&
					"bg-red-500/90 text-gray-100 hover:bg-red-700/75",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
