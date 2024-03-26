import { type ProductsListItemFragment } from "@/gql/graphql";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { formatMoney } from "@/utils";
import Link from "next/link";
import { Suspense } from "react";

export const RelatedProductItems = ({
	products,
}: {
	products: ProductsListItemFragment[];
}) => {
	return (
		<Suspense>
			<section>
				<ul
					data-testid="products-list"
					className="md-grid-cols-3 my-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
				>
					{products.map((product) => (
						<li key={product.id}>
							<Link href={`/product/${product?.id}`}>
								<article>
									{product?.images && (
										<ProductCoverImage
											src={product?.images[0]?.url}
											alt=""
										/>
									)}
									<div className="justif-between mt-2 flex">
										<div>
											<h2 className="text-sm font-semibold text-gray-700">
												{product.name}
											</h2>
											{product.categories && (
												<p className="mt-3 text-sm text-gray-500">
													<span className="sr-only">Category: </span>
													{product.categories[0].name}
												</p>
											)}
										</div>
										<p className="text-sm font-medium text-gray-900">
											<span className="sr-only">Cena: </span>
											{formatMoney(product.price / 100)}
										</p>
									</div>
								</article>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</Suspense>
	);
};
