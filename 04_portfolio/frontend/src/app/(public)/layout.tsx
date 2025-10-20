import { Grid, GridItem } from "@/components/layout/grid/grid";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<Grid className="flex flex-col min-h-dvh gap-m">
			<GridItem span={12} className="bg-red-500">
				<header>this is the navigation</header>
			</GridItem>
			<GridItem span={12} className="flex-1">
				{children}
			</GridItem>
			<GridItem span={12} className="bg-red-500">
				<footer>this is the footer</footer>
			</GridItem>
		</Grid>
	);
}
