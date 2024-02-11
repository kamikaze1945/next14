import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/ui/atoms/ProductItemDescription";
import { ProductItemType } from "@/ui/types";
import Link from "next/link";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					<ProductCoverImage {...product.coverImage} />
					<ProductItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
