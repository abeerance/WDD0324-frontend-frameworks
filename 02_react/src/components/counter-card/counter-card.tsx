"use client";

import { Button } from "@/components/ui/buttons/button";
import { Text } from "@/components/ui/text/text";
import { useState } from "react";

/**
 * Props interface for CounterCard component
 *
 * Defines the initial state value for the counter demonstration.
 */
interface CounterCardProps {
	initialCount?: number; // Optional starting value, defaults to 0
}

/**
 * CounterCard Component - Teacher Demonstration Example
 *
 * Interactive component demonstrating React state management with useState.
 * Shows how to:
 * - Declare and initialize state
 * - Update state with setter functions
 * - Render dynamic UI based on state changes
 * - Handle user interactions with event handlers
 *
 * This example uses the "use client" directive for Next.js app router interactivity.
 *
 * @param initialCount - Starting value for the counter (default: 0)
 * @returns JSX element with interactive counter interface
 */
export const CounterCard = ({ initialCount = 0 }: CounterCardProps) => {
	/**
	 * State declaration using useState hook
	 *
	 * - count: current state value
	 * - setCount: function to update the state
	 * - initialCount: initial value passed as argument to useState
	 */
	const [count, setCount] = useState<number>(initialCount);

	/**
	 * Handler to increment counter by 1
	 *
	 * Uses functional update pattern to ensure we're working with
	 * the most current state value.
	 */
	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	/**
	 * Handler to decrement counter by 1
	 *
	 * Uses functional update pattern for consistency.
	 */
	const handleDecrement = () => {
		setCount((prevCount) => prevCount - 1);
	};

	/**
	 * Handler to reset counter back to initial value
	 *
	 * Demonstrates direct state update (not functional) since
	 * we're setting to a known value, not computing from previous state.
	 */
	const handleReset = () => {
		setCount(initialCount);
	};

	return (
		<div className="bg-neutral-10 rounded-xl shadow-md p-xl border border-neutral-20 max-w-md mx-auto">
			{/* Header section */}
			<div className="text-center mb-xl">
				<Text
					as="h3"
					variant="headline-3"
					className="font-bold text-neutral-98 mb-xs"
				>
					Counter Example
				</Text>
				<Text className="text-neutral-60">
					Click buttons to update the counter state
				</Text>
			</div>

			{/* Counter display - Updates automatically when state changes */}
			<div className="bg-blue-10 rounded-lg p-xl mb-xl text-center">
				<Text variant="body-small" className="text-neutral-60 mb-xs">
					Current Count
				</Text>
				<Text as="span" variant="headline-1" className="font-bold text-blue-60">
					{count}
				</Text>
			</div>

			{/* Action buttons */}
			<div className="flex flex-col space-y-s">
				{/* Increment button - Primary action */}
				<Button onClick={handleIncrement}>Increment (+1)</Button>

				{/* Decrement button - Secondary action */}
				<Button variant="secondary" onClick={handleDecrement}>
					Decrement (-1)
				</Button>

				{/* Reset button - Tertiary action */}
				<Button variant="destructive" onClick={handleReset}>
					Reset
				</Button>
			</div>

			{/* Visual feedback section - Conditional rendering based on state */}
			<div className="mt-xl pt-l border-t border-neutral-20">
				<Text variant="body-small" className="text-neutral-60 text-center">
					{count === 0 && "Counter is at zero"}
					{count > 0 && `Counter is positive: +${count}`}
					{count < 0 && `Counter is negative: ${count}`}
				</Text>
			</div>
		</div>
	);
};
