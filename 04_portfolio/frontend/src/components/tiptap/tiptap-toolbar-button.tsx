import { cn } from "@/lib/utils";
import { icons } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type IconName = keyof typeof icons;

interface TiptapToolbarButtonProps extends ComponentPropsWithoutRef<"button"> {
	isActive?: boolean;
	icon: IconName;
	label?: string;
}

export const TiptapToolbarButton = ({
	isActive = false,
	icon,
	label,
	className,
	...props
}: TiptapToolbarButtonProps) => {
	const IconComponent = icons[icon];

	return (
		<button
			type="button"
			className={cn(
				"px-s py-2xs rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-300",
				isActive
					? "bg-primary-500 text-white hover:bg-primary-600"
					: "bg-background-100 hover:bg-background-200",
				className,
			)}
			title={label}
			{...props}
		>
			<IconComponent size={18} />
		</button>
	);
};
