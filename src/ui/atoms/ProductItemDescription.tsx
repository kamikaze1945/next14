import { type ProductItemType } from "@/types/products";
import { formatMoney } from "@/utils";

type ProductItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductItemDescription = ({
	product: { name, category, price },
}: ProductItemDescriptionProps) => {
	return (
		<div className="justif-between mt-2 flex">
			<div>
				<h1 className="text-sm font-semibold text-gray-700">
					{name}
				</h1>

				<p className="mt-3 text-sm text-gray-500">
					<span className="sr-only">Category: </span>
					{category}
				</p>
			</div>
			<p className="text-sm font-medium text-gray-900">
				<span className="sr-only">Cena: </span>
				{formatMoney(price / 100)}
			</p>
		</div>
	);
};
