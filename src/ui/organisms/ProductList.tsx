import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { ProductItemType } from "@/ui/types";

export const ProductList = ({
	products,
}: {
	products: ProductItemType[];
}) => {
	return (
		<ul className="md-grid-cols-3 my-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{products.map((product) => (
				<ProductListItem key={product.id} product={product} />
			))}
		</ul>
	);
};
