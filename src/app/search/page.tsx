import { Suspense } from "react";
import { searchPoductsByTerm } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

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

	return (
		<Suspense>
			{products && <ProductList products={products || []} />}
			{!products && (
				<div className="justify-center text-center">
					No products found
				</div>
			)}
		</Suspense>
	);
}
