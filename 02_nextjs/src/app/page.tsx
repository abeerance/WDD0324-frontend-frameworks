import { UserProfile } from "@/components/features/user/user-profile";
import { Text } from "@/components/ui/text/text";

export interface User {
	id: number;
	name: string;
	email: string;
	avatarUrl: string;
	role: string;
	joinDate: string;
	isOnline: boolean;
}

// mock data for user
const user: User = {
	id: 1,
	name: "John Doe",
	email: "john.doe@example.com",
	avatarUrl:
		"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
	role: "admin",
	joinDate: "2022-01-01",
	isOnline: true,
};

export default function Home() {
	return (
		<div className="max-w-6xl mx-auto space-y-3xl">
			{/* USER PROFILE SECTION */}
			<section>
				<Text
					as="h1"
					variant="headline-1"
					className="font-bold text-neutral-98 mb-xl"
				>
					User Profile Example
				</Text>
				<UserProfile user={user} />
			</section>
		</div>
	);
}
