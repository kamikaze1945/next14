import { getProductsByCategorySlug } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type RelatedProductListProps = {
	params: {
		categorySlug?: string;
	};
};

export const RelatedProductList = async ({
	params,
}: RelatedProductListProps) => {
	if (!params.categorySlug) {
		return null;
	}
	const products = await getProductsByCategorySlug(
		params.categorySlug,
	);

	if (!products) {
		return null;
	}

	return (
		<Suspense>
			<div data-testid="related-products" aria-busy="true">
				<ProductList products={products?.slice(-4)} />
			</div>
		</Suspense>
	);
};
