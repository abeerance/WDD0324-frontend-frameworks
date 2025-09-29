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

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	category: string;
	rating: number;
	reviews: number;
	inStock: boolean;
}

const user: User = {
	id: 1,
	name: "John Doe",
	email: "john@example.com",
	avatarUrl:
		"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
	role: "Admin",
	joinDate: "Jan 2023",
	isOnline: true,
};

const products: Product[] = [
	{
		id: 1,
		name: "MacBook Pro 16-inch",
		price: 2499,
		image:
			"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
		category: "Electronics",
		rating: 4.8,
		reviews: 156,
		inStock: true,
	},
	{
		id: 2,
		name: "iPhone 15 Pro",
		price: 999,
		image:
			"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
		category: "Electronics",
		rating: 4.6,
		reviews: 324,
		inStock: true,
	},
	{
		id: 3,
		name: "AirPods Pro",
		price: 249,
		image:
			"https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=200&fit=crop",
		category: "Accessories",
		rating: 4.7,
		reviews: 89,
		inStock: false,
	},
	{
		id: 4,
		name: "iPad Air",
		price: 599,
		image:
			"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=200&fit=crop",
		category: "Tablets",
		rating: 4.5,
		reviews: 203,
		inStock: true,
	},
];

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

			{/* PRODUCTS SECTION - STUDENTS WILL REFACTOR THIS THEMSELVES */}
			<section>
				<h1 className="text-headline-1 font-bold text-neutral-98 mb-xl">
					Products Dashboard - For Students to Refactor
				</h1>

				{/* Header Component - Should be extracted */}
				<div className="bg-neutral-10 rounded-lg shadow-sm p-l mb-l border border-neutral-20">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-m">
							<div className="w-10 h-10 bg-blue-60 rounded-lg flex items-center justify-center">
								<span className="text-neutral-100 font-bold text-headline-4">
									S
								</span>
							</div>
							<div>
								<h2 className="text-headline-2 font-bold text-neutral-98">
									Store Dashboard
								</h2>
								<p className="text-body text-neutral-60">
									Manage your products and inventory
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-m">
							<div className="text-right">
								<p className="text-body-small text-neutral-60">
									Total Products
								</p>
								<p className="text-headline-2 font-bold text-blue-60">
									{products.length}
								</p>
							</div>
							<button
								type="button"
								className="bg-blue-60 text-neutral-100 px-l py-xs rounded-lg hover:bg-blue-50 transition-colors"
							>
								Add Product
							</button>
						</div>
					</div>
				</div>

				{/* Stats Cards - Should be extracted */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-m mb-xl">
					<div className="bg-neutral-10 rounded-lg shadow p-l border border-neutral-20">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-body-small font-medium text-neutral-60">
									In Stock
								</p>
								<p className="text-headline-2 font-bold text-green-60">
									{products.filter((p) => p.inStock).length}
								</p>
							</div>
							<div className="w-12 h-12 bg-green-10 rounded-lg flex items-center justify-center">
								<svg
									className="w-6 h-6 text-green-60"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Tick</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className="bg-neutral-10 rounded-lg shadow p-l border border-neutral-20">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-body-small font-medium text-neutral-60">
									Out of Stock
								</p>
								<p className="text-headline-2 font-bold text-red-60">
									{products.filter((p) => !p.inStock).length}
								</p>
							</div>
							<div className="w-12 h-12 bg-red-10 rounded-lg flex items-center justify-center">
								<svg
									className="w-6 h-6 text-red-60"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>X</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className="bg-neutral-10 rounded-lg shadow p-l border border-neutral-20">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-body-small font-medium text-neutral-60">
									Total Value
								</p>
								<p className="text-headline-2 font-bold text-blue-60">
									$
									{products
										.reduce((sum, p) => sum + p.price, 0)
										.toLocaleString()}
								</p>
							</div>
							<div className="w-12 h-12 bg-blue-10 rounded-lg flex items-center justify-center">
								<svg
									className="w-6 h-6 text-blue-60"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Dollar</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className="bg-neutral-10 rounded-lg shadow p-l border border-neutral-20">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-body-small font-medium text-neutral-60">
									Avg Rating
								</p>
								<p className="text-headline-2 font-bold text-yellow-60">
									{(
										products.reduce((sum, p) => sum + p.rating, 0) /
										products.length
									).toFixed(1)}
								</p>
							</div>
							<div className="w-12 h-12 bg-yellow-10 rounded-lg flex items-center justify-center">
								<svg
									className="w-6 h-6 text-yellow-60"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<title>Star</title>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Product Cards Grid - THIS IS THE MAIN CARD MAP COMPONENT TO REFACTOR */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-l">
					{products.map((product) => (
						<div
							key={product.id}
							className="bg-neutral-10 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-20"
						>
							<div className="relative">
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-48 object-cover"
								/>
								<div className="absolute top-s right-s">
									{product.inStock ? (
										<span className="bg-green-60 text-neutral-100 text-body-small font-bold px-s py-2xs rounded-full shadow-lg">
											In Stock
										</span>
									) : (
										<span className="bg-red-60 text-neutral-100 text-body-small font-bold px-s py-2xs rounded-full shadow-lg">
											Sold Out
										</span>
									)}
								</div>
								<div className="absolute top-s left-s">
									<span className="bg-blue-60 text-neutral-100 text-body-small font-semibold px-xs py-2xs rounded">
										{product.category}
									</span>
								</div>
							</div>

							<div className="p-l">
								<div className="mb-s">
									<h3 className="text-headline-4 font-bold text-neutral-98 mb-2xs line-clamp-2">
										{product.name}
									</h3>
									<p className="text-headline-2 font-bold text-blue-60">
										${product.price.toLocaleString()}
									</p>
								</div>

								<div className="flex items-center mb-m">
									<div className="flex items-center mr-xs">
										{[...Array(5)].map((_, index) => (
											<svg
												// biome-ignore lint/suspicious/noArrayIndexKey: Fixed array of 5 stars
												key={index}
												className={`w-4 h-4 ${index < Math.floor(product.rating) ? "text-yellow-60" : "text-neutral-40"}`}
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<title>Star</title>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
										))}
									</div>
									<span className="text-body-small text-neutral-98 font-medium">
										{product.rating}
									</span>
									<span className="text-body-small text-neutral-60 ml-2xs">
										({product.reviews})
									</span>
								</div>

								<div className="flex space-x-xs">
									<button
										type="button"
										className="flex-1 bg-blue-60 text-neutral-100 py-xs px-m rounded-lg hover:bg-blue-50 transition-colors font-medium"
									>
										Edit
									</button>
									<button
										type="button"
										className="flex-1 bg-neutral-20 text-neutral-98 py-xs px-m rounded-lg hover:bg-neutral-30 transition-colors font-medium"
									>
										View
									</button>
									<button
										type="button"
										className="bg-red-20 text-red-60 p-xs rounded-lg hover:bg-red-30 transition-colors"
									>
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>Trashbin</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
