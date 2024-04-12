import { Suspense } from "react";
import { searchPoductsByTerm } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";
import { PageTitle } from "@/ui/atoms/PageTitle";

export default async function SearchPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] };
}) {
	let products = null;
	if (searchParams.query !== null && searchParams.query.length > 2) {
		products = await searchPoductsByTerm(
			searchParams?.query as string,
		);
	}
	const pageTitle = `Search products - ${searchParams.query}`;

	return (
		<Suspense>
			{products === undefined || products?.length === 0 ? (
				<div className="flex h-[60vh] flex-col items-center justify-center">
					<h2 className="text-2xl font-semibold leading-8 text-gray-500">
						Products not found
					</h2>
					<div className="flex items-center">
						<p>
							<a
								href="/products"
								title="Continue Shopping"
								className="underline"
							>
								Continue Shopping
							</a>
						</p>
					</div>
				</div>
			) : (
				<>
					<PageTitle param={pageTitle} />
					<ProductList products={products || []}></ProductList>
				</>
			)}
		</Suspense>
	);
}
