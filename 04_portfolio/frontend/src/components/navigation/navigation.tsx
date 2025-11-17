import { auth } from "@/lib/auth";
import Link from "next/link";
import { SignOutButton } from "../auth/sign-out-button";

export const Navigation = async () => {
	const session = await auth();

	return (
		<header className="flex justify-between items-center p-m border-b border-background-300">
			<nav>
				<ul className="flex gap-xs">
					<li>
						<Link href={"/notes"}>Notes</Link>
					</li>
					<li>
						<Link href={"/work"}>Work</Link>
					</li>
					{session?.user && (
						<>
							<li>
								<Link href={"/notes/new"}>New Note</Link>
							</li>
							<li>
								<Link href={"/work/new"}>New Project</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
			{session?.user && (
				<div className="flex items-center gap-m">
					<span>Welcome, {session?.user.username}</span>
					<SignOutButton />
				</div>
			)}
		</header>
	);
};
