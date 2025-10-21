import { auth } from "@/lib/auth";

export default async function DashboardPage() {
	// Fetch current session - contains user data from our Laravel API
	const session = await auth();

	return (
		<div className="p-m">
			<h1 className="text-headline-3 mb-m">Dashboard</h1>
			<div className="bg-background-200 p-m rounded-lg">
				<h2 className="text-headline-4 mb-s">User Information</h2>
				<p>
					<strong>ID:</strong> {session?.user?.id}
				</p>
				<p>
					<strong>Username:</strong> {session?.user?.username}
				</p>
				<p>
					<strong>Name:</strong> {session?.user?.firstName}
					{session?.user?.lastName}
				</p>
				<p>
					<strong>Email:</strong> {session?.user?.email}
				</p>
				<p>
					<strong>Role:</strong> {session?.user?.userRole}
				</p>
				<p>
					<strong>Access Token:</strong>
					{session?.user?.accessToken.substring(0, 20)}...
				</p>
			</div>
		</div>
	);
}
