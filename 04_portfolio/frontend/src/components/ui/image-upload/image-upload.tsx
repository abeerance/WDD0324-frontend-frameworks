"use client";

import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Text } from "../text/text";

interface ImageUploadProps {
	onSelect: (file: File) => void;
	previewUrl?: string | null;
	onRemove?: () => void;
	className?: string;
}

/* 
	Drag-and-drop image upload component with preview
	Validates file siye and shows upload image with remove option
*/
export const ImageUpload = ({
	onSelect,
	previewUrl,
	onRemove,
	className,
}: ImageUploadProps) => {
	const [error, setError] = useState<string | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (!file) return;

			// Validate file size (10MB limit)
			if (file.size > 10 * 1024 * 1024) {
				setError("File size must be less than 10MB");
				return;
			}

			setError(null);
			onSelect(file);
		},
		[onSelect],
	);

	/* 
	react-dropzone hook provides:
	- getRootProps: Props for dropzone container (drag/drop handlers, accessibility)
	- getInputProps: Props for the hidden file input (opens file picker on click)
	- isDragActive: Boolean tracking if file is currentyl being dragged over
	*/

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
		},
		maxFiles: 1,
	});

	const handleRemove = () => {
		setError(null);
		onRemove?.();
	};

	// Preview mode: show uploaded image with remove button
	if (previewUrl) {
		return (
			<div className={cn("relative", className)}>
				<div className="relative w-full overflow-hidden rounded-lg border border-background-300 aspect-[1.618/1]">
					<img
						src={previewUrl}
						alt="Upload preview"
						className="h-full w-full object-cover"
					/>
				</div>
				<button
					type="button"
					onClick={handleRemove}
					className="absolute top-xs right-xs rounded-full bg-secondary-500 p-s text-white shadow-lg hover:bg-secondary-600 transition-colors duration-300"
				>
					<X size={14} />
				</button>
			</div>
		);
	}

	// Upload mode: dropzone with visual feedback
	return (
		<div className="relative">
			<div
				{...getRootProps()}
				className={cn(
					"border-2 border-dashed rounded-lg p-l cursor-pointer transition-colors",
					isDragActive
						? "border-r-primary-500 bg-primary-50"
						: "border-background-300 hover:border-primary-500",
					className,
				)}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center justify-center gap-s">
					<Upload size={16} className="text-foreground-400" />
					<div>
						<Text className="font-semibold">
							{isDragActive
								? "Drop image here"
								: "Drop image or click to upload"}
						</Text>
						<Text variant="body-small" className="text-foreground-400 mt-xs">
							PNG, JPG, GIF, WEBP up to 10MB
						</Text>
					</div>
				</div>
			</div>
			{error && (
				<Text
					variant="body-small"
					className="text-secondary-700 font-semibold absolute -bottom-m"
				>
					{error}
				</Text>
			)}
		</div>
	);
};
