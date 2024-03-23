import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";
import { Suspense } from "react";

type CategoryProductPageProps = {
	params: {
		category: string;
		page?: string[];
	};
};

export const generateMetadata = async ({
	params,
}: CategoryProductPageProps): Promise<Metadata> => {
	const products = await getProductsByCategorySlug(params.category);

	let productName = "Category best product";
	let productDescription = "Get category best product now!";

	if (products && products.length > 0) {
		productName = products[0].name;
		productDescription = products[0].description;
	}

	return {
		title: `${productName} - Category`,
		description: `${productDescription}`,
	};
};

export const generateStaticParams = async ({
	params,
}: {
	params: { category: string };
}) => {
	if (params.category === "t-shirts") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else {
		return [{ pageNumber: "1" }];
	}
};

export default async function CategoryProductPage({
	params,
}: CategoryProductPageProps) {
	const products = await getProductsByCategorySlug(params.category);

	if (!products) {
		throw notFound();
	}
	return (
		<>
			<Suspense>
				<ProductList products={products || []} />
			</Suspense>
		</>
	);
}
