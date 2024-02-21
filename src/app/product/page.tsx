import { Suspense } from "react";
import type { Metadata } from "next";
import { getProductById, getProductList } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/ui/atoms/ProductItemDescription";
import { SuggestedProductList } from "@/ui/organisms/SuggestedProductList";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return {
		title: `${product.name}`,
		description: `${product.description}`,
	};
};

//generate static pages when use build production
export const generateStaticParams = async () => {
	const products = await getProductList();

	return products.map((product) => ({
		productId: product.id,
	}));
};

export default async function ProductsPage({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams: { [key: string]: string | string[] };
}) {
	const referral = searchParams.referral?.toString();

	const product = await getProductById(params.productId);

	return (
		<>
			<article className="max-w-xs" data-referral={referral}>
				{product.coverImage && (
					<ProductCoverImage {...product.coverImage} />
				)}
				<ProductItemDescription product={product} />
			</article>
			<aside>
				<Suspense>
					<SuggestedProductList />
				</Suspense>
			</aside>
		</>
	);
}
