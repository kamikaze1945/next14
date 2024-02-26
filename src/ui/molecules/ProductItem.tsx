import Link from "next/link";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductItemDescription } from "@/ui/atoms/ProductItemDescription";
import { type ProductsListItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductsListItemFragment;
};

export const ProductItem = ({ product }: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product?.id}`}>
				<article>
					{product?.images && (
						<ProductCoverImage src={product?.images[0]?.url} alt="" />
					)}
					<ProductItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
