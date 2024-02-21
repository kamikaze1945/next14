import { ProductItem } from "@/ui/molecules/ProductItem";
import { type ProductItemType } from "@/consts/products";

export const ProductList = ({
	products,
}: {
	products: ProductItemType[];
}) => {
	return (
		<section>
			<ul
				data-testid="products-list"
				className="md-grid-cols-3 my-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
			>
				{products.map((product) => (
					<ProductItem key={product.id} product={product} />
				))}
			</ul>
		</section>
	);
};
