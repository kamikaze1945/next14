//import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
	getProductById,
	getProductsByCollectionSlug,
} from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/ui/atoms/ProductItemDescription";
import { type ProductsListItemFragment } from "@/gql/graphql";
import { RelatedProductList } from "@/ui/organisms/RelatedProductList";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: ProductsListItemFragment["id"] };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	return {
		title: `${product?.name} - Next.js Shop`,
		description: `${product?.description}`,
	};
};

//generate static pages when use build production
// export const generateStaticParams = async ({
// 	params,
// }: {
// 	params: { productId: ProductsListItemFragment["id"] };
// }) => {
// 	const product = await getProductById(params.productId);

// 	if (product) {
// 		return product.id;
// 	}
// };

export default async function SingleProductPage({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams: { [key: string]: string | string[] };
}) {
	const referral = searchParams.referral?.toString();

	const product = await getProductById(params.productId);

	if (!product) {
		throw notFound();
	}

	const productsCollections =
		await getProductsByCollectionSlug("summer-vibes");
	console.log(productsCollections);

	if (!productsCollections) {
		throw notFound();
	}

	return (
		<>
			<article className="max-w-xs" data-referral={referral}>
				{product.images[0] && (
					<ProductCoverImage src={product.images[0].url} alt="" />
				)}
				<ProductItemDescription product={product} />
			</article>
			<aside>
				<Suspense>
					<RelatedProductList
						params={{
							categorySlug: product?.categories[0]?.slug || undefined,
						}}
					/>
				</Suspense>
			</aside>
		</>
	);
}
