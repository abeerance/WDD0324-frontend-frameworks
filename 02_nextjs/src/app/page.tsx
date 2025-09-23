import { Text } from "@/components/ui/text/text";

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<Text as="h1" variant="headline-1">
				Ich bin ein H1 element
			</Text>
			<Text as="h2" variant="headline-2">
				Ich bin ein H2 element
			</Text>
		</div>
	);
}
