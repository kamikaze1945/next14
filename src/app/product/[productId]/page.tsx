import { getProductById, getProductList } from "@/api/products";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/ui/atoms/ProductItemDescription";
import { SuggestedProductList } from "@/ui/organisms/SuggestedProductList";
import { Suspense } from "react";

// generate static pages when use build production
// export const generateStaticPage = async () => {
// 	const products = await getProductList();

// 	return products
// 		.map((product) => ({
// 			params: { productId: product.id },
// 		}))
// 		.slice(0, 2);
// };

export default async function SingleProduct({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams: { [key: string]: string | string[] };
}) {
	//	const referral = searchParams.referral?.toString();

	const product = await getProductById(params.productId);

	return (
		<>
			<article className="max-w-xs">
				<ProductCoverImage {...product.coverImage} />
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
