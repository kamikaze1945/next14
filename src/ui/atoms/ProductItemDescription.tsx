import { type ProductsListItemFragment } from "@/gql/graphql";
import { ProductRating } from "@/ui/molecules/ProductRating";
import { formatMoney } from "@/utils";

type ProductItemDescriptionProps = {
	product: ProductsListItemFragment;
};

export const ProductItemDescription = ({
	product: { name, categories, price, rating },
}: ProductItemDescriptionProps) => {
	return (
		<div className="justif-between mt-2 flex">
			<div>
				<h1 className="text-sm font-semibold text-gray-700">
					{name}
				</h1>
				{categories && (
					<div className="mt-3 text-sm text-gray-500">
						<span className="sr-only">Category: </span>
						{categories[0].name}
					</div>
				)}
				<ProductRating rating={rating || 0} />
			</div>
			<div className="text-sm font-medium text-gray-900">
				<span className="sr-only">Cena: </span>
				<span data-testid="product-price">
					{formatMoney(price / 100)}
				</span>
			</div>
		</div>
	);
};
