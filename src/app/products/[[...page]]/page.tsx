import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByPage } from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

export const metadata: Metadata = {
	title: "All products",
	description: "Products list - you can find here all products.",
};

type ProductPageProps = {
	params: {
		page?: number;
	};
};

export default async function ProductsPage({
	params,
}: ProductPageProps) {
	const currentPage = params?.page || 1;
	const take = 10;
	const offset = (currentPage - 1) * take || 0;
	const products = await getProductsByPage(take, offset);

	if (!products) {
		throw notFound();
	}

	return (
		<>
			<ProductList products={products?.data || []} />
			<Pagination
				pageNumber={currentPage}
				totalPages={Math.ceil(products?.meta?.total / take) || 0}
			/>
		</>
	);
}
