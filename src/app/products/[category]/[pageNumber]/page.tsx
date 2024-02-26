import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";

type CategoryProductPageProps = {
	params: {
		category: string;
		page?: string[];
	};
};
export const generateStaticParams = async ({
	params,
}: {
	params: { category: string };
}) => {
	if (params.category === "t-shirts") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else {
		return [{ pageNumber: "1" }];
	}
};

export default async function CategoryProductPage({
	params,
}: CategoryProductPageProps) {
	const products = await getProductsByCategorySlug(params.category);

	if (!products) {
		throw notFound();
	}
	return (
		<>
			<ProductList products={products || []} />
		</>
	);
}
