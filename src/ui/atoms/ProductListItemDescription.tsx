import { ProductItemType } from "@/ui/types";

type ProductListItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({
	product: { name, category, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="justif-between mt-2 flex">
			<div>
				<h3 className="text-sm font-semibold text-gray-700">
					{name}
				</h3>

				<p className="text-sm text-gray-500">
					<span className="sr-only">Kategoria: </span>
					{category}
				</p>
			</div>
			<p className="text-sm font-medium text-gray-900">
				<span className="sr-only">Kategoria: </span> {price}$
			</p>
		</div>
	);
};
