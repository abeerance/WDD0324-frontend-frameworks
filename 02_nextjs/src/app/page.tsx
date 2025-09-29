import { UserHeader } from "@/components/features/user/user-header";

interface User {
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
				<h1 className="text-headline-1 font-bold text-neutral-98 mb-xl">
					User Profile Example
				</h1>
				<div className="bg-neutral-10 rounded-lg shadow-md p-l max-w-md mx-auto border border-neutral-20">
					{/* Avatar Section */}
					<UserHeader
						name={user.name}
						avatarUrl={user.avatarUrl}
						avatarAlt={user.name}
						isOnline={user.isOnline}
						email={user.email}
					/>

					{/* User Info Section */}
					<div className="border-t border-neutral-20 pt-m">
						<div className="mb-xs">
							<span className="text-body-small font-medium text-neutral-60">
								Role:
							</span>
							<span className="ml-xs text-body-small text-neutral-98">
								{user.role}
							</span>
						</div>
						<div className="mb-xs">
							<span className="text-body-small font-medium text-neutral-60">
								Member since:
							</span>
							<span className="ml-xs text-body-small text-neutral-98">
								{user.joinDate}
							</span>
						</div>
						<div className="mb-m">
							<span className="text-body-small font-medium text-neutral-60">
								Status:
							</span>
							<span
								className={`ml-xs text-body-small ${user.isOnline ? "text-green-60" : "text-neutral-60"}`}
							>
								{user.isOnline ? "Online" : "Offline"}
							</span>
						</div>
					</div>

					{/* Action Buttons Section */}
					<div className="flex space-x-s">
						<button
							type="button"
							className="flex-1 bg-blue-60 text-neutral-100 py-xs px-m rounded-md hover:bg-blue-50 transition-colors"
						>
							Send Message
						</button>
						<button
							type="button"
							className="flex-1 bg-neutral-20 text-neutral-98 py-xs px-m rounded-md hover:bg-neutral-30 transition-colors"
						>
							View Profile
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
