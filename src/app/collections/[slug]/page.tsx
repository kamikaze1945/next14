import { notFound } from "next/navigation";
import { getProductsByCollectionSlug } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

type CollectionsPrdoductPageProps = {
	params: {
		slug: string;
	};
};

export default async function CollectionsPrdoductPage({
	params,
}: CollectionsPrdoductPageProps) {
	const products = await getProductsByCollectionSlug(params.slug);

	if (!products) {
		throw notFound();
	}

	return (
		console.log(params),
		(
			<>
				<ProductList products={products || []} />
			</>
		)
	);
}
