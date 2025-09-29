export interface UserAvatarProps {
	avatarUrl: string;
	avatarAlt: string;
	isOnline: boolean;
}

export const UserAvatar = ({
	avatarUrl,
	avatarAlt,
	isOnline,
}: UserAvatarProps) => {
	return (
		<div className="relative">
			<img
				src={avatarUrl}
				alt={avatarAlt}
				className="w-16 h-16 rounded-full object-cover border-2 border-neutral-30"
			/>
			{isOnline && (
				<div className="absolute bottom-0 right-0 w-4 h-4 bg-green-60 rounded-full border-2 border-neutral-10" />
			)}
		</div>
	);
};
