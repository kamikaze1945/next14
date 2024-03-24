import { getProductsByCategorySlug } from "@/api/products";
import { RelatedProductItems } from "@/ui/organisms/RelatedProductItems";
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
				<RelatedProductItems products={products?.slice(-4)} />
			</div>
		</Suspense>
	);
};
