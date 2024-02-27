import { notFound } from "next/navigation";
import { Suspense } from "react";
import { searchPoductsByTerm } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function SearchPage({
	searchParams,
}: {
	params: { productId: string };
	searchParams: { [key: string]: string | string[] };
}) {
	if (searchParams.query === null) {
		return [];
	}
	const products = await searchPoductsByTerm(
		searchParams?.query as string,
	);

	if (!products) {
		throw notFound();
	}

	return (
		<>
			<Suspense>
				<ProductList products={products || []} />
			</Suspense>
		</>
	);
}
