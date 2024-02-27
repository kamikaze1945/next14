import { getProductsByCategorySlug } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

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
		<div data-testid="related-products">
			<ProductList products={products?.slice(-4)} />
		</div>
	);
};
