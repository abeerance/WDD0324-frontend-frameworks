import { Text } from "@/components/ui/text/text";
import { UserAvatar, type UserAvatarProps } from "./user-avatar";

interface UserHeaderProps extends UserAvatarProps {
	name: string;
	email: string;
}

export const UserHeader = ({
	avatarUrl,
	isOnline,
	name,
	email,
}: UserHeaderProps) => {
	return (
		<div className="flex items-center mb-m">
			<UserAvatar avatarUrl={avatarUrl} avatarAlt={name} isOnline={isOnline} />
			<div className="ml-m">
				<Text
					as="h2"
					variant="headline-3"
					className="font-semibold text-neutral-98"
				>
					{name}
				</Text>
				<Text className="text-neutral-60">{email}</Text>
			</div>
		</div>
	);
};
