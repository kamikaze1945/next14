import { type ProductsListItemFragmentFragment } from "@/gql/graphql";
import { ProductItem } from "@/ui/molecules/ProductItem";

export const ProductList = ({
	products,
}: {
	products: ProductsListItemFragmentFragment[];
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
