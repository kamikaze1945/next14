import { type ProductsListItemFragmentFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type ProductItemDescriptionProps = {
	product: ProductsListItemFragmentFragment;
};

export const ProductItemDescription = ({
	product: { name, categories, price },
}: ProductItemDescriptionProps) => {
	return (
		<div className="justif-between mt-2 flex">
			<div>
				<h1 className="text-sm font-semibold text-gray-700">
					{name}
				</h1>
				{categories && (
					<p className="mt-3 text-sm text-gray-500">
						<span className="sr-only">Category: </span>
						{categories[0].name}
					</p>
				)}
			</div>
			<p className="text-sm font-medium text-gray-900">
				<span className="sr-only">Cena: </span>
				{formatMoney(price / 100)}
			</p>
		</div>
	);
};
