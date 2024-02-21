import Link from "next/link";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/ui/atoms/ProductItemDescription";
import { type ProductItemType } from "@/types/products";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					{product.coverImage && (
						<ProductCoverImage {...product.coverImage} />
					)}
					<ProductItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
