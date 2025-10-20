import { AuthForm } from "@/components/forms/auth/auth-form";
import { Grid, GridItem } from "@/components/layout/grid/grid";
import { Text } from "@/components/ui/text/text";

export default function AdminPage() {
	return (
		<Grid className="min-h-dvh items-center">
			<GridItem
				span={{ sm: 12, md: 6, lg: 4 }}
				offset={{ sm: 0, md: 3, lg: 4 }}
			>
				<Text variant="headline-4">Admin Login</Text>
				<AuthForm />
			</GridItem>
		</Grid>
	);
}
