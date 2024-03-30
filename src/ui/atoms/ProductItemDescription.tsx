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
		<div className="justif-between mt-2">
			<div className="flex grid h-8 grid-cols-2 items-center justify-between ">
				<div>
					<h1 className="text-sm font-semibold text-gray-700">
						{name}
					</h1>
				</div>
				<div className="text-right">
					<span className="sr-only">Cena: </span>
					<span data-testid="product-price">
						{formatMoney(price / 100)}
					</span>
				</div>
			</div>
			<div>
				{categories && (
					<div className="mt-3 text-sm text-gray-500">
						<span className="sr-only">Category: </span>
						{categories[0].name}
					</div>
				)}
			</div>

			<ProductRating rating={rating || 0} />
		</div>
	);
};
