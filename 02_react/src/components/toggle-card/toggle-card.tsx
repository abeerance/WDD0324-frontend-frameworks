"use client";

import { Button } from "@/components/ui/buttons/button";
import { Text } from "@/components/ui/text/text";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useState } from "react";

/**
 * ToggleCard Component - Complete Working Solution
 *
 * Interactive component demonstrating boolean state management with useState.
 * Toggles between light and dark themes with conditional styling.
 */
export const ToggleCard = () => {
	/**
	 * State declaration for theme toggle
	 *
	 * - isDarkMode: boolean indicating current theme
	 * - setIsDarkMode: function to update theme state
	 * - Initial value: false (light mode by default)
	 */
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

	/**
	 * Handler to toggle theme between light and dark
	 *
	 * Uses functional update pattern to toggle boolean value.
	 */
	const handleToggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	return (
		<div
			className={cn(
				"rounded-xl shadow-md p-xl border max-w-md mx-auto  bg-neutral-10 border-neutral-20 transition-all duration-300",
				isDarkMode && "bg-neutral-98 border-neutral-60",
			)}
		>
			{/* Header section */}
			<div className="text-center mb-xl">
				<Text
					as="h3"
					variant="headline-3"
					className={cn(
						"font-bold mb-xs text-neutral-98 transition-all duration-300",
						isDarkMode && "text-neutral-10",
					)}
				>
					Toggle Theme Example
				</Text>
				<Text
					className={cn(
						"text-neutral-60 transition-all duration-300",
						isDarkMode && "text-neutral-40",
					)}
				>
					Click the button to toggle between light and dark mode
				</Text>
			</div>

			{/* Theme indicator */}
			<div className="bg-blue-10 rounded-lg p-l mb-xl text-center">
				<Text variant="body-small" className="text-neutral-60 mb-xs">
					Current Theme
				</Text>
				<Text as="span" variant="headline-3" className="font-bold text-blue-60">
					{isDarkMode ? "Dark Mode" : "Light Mode"}
				</Text>
			</div>

			{/* Toggle button */}
			<Button onClick={handleToggleTheme} className="w-full">
				{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
			</Button>

			{/* Visual feedback section */}
			<div className="mt-xl pt-l border-t border-neutral-20">
				<Text variant="body-small" className="text-neutral-60 text-center">
					Try toggling the theme and watch the colors change
				</Text>
			</div>
		</div>
	);
};
