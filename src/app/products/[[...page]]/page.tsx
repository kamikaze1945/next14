import { getPaginationProductList } from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "All products",
	description: "Products list - you can find here all products.",
};

type ProductPageProps = {
	params: {
		page?: string[];
	};
};

export async function generateStaticParams() {
	const products = await getPaginationProductList();
	const totalPages = Math.ceil(products.length / 20);
	const paths = Array.from(
		{ length: totalPages },
		(_, i) => i + 1,
	).map((page) => ({
		params: { page: [String(page)] },
	}));
	return paths;
}

export default async function ProductsPage({
	params,
}: ProductPageProps) {
	const offset = params.page ? Number(params.page[0]) * 20 - 20 : 0;
	console.log("ProductsPage offset", offset);
	const products = await getPaginationProductList(20, offset);

	const pageNumber = params.page ? Number(params.page[0]) : 0;
	const productsCount = await getPaginationProductList();
	const totalPages = Math.ceil(productsCount.length / 20);

	return (
		<>
			<Pagination pageNumber={pageNumber} totalPages={totalPages} />
			<ProductList products={products || []} />
			<Pagination pageNumber={pageNumber} totalPages={totalPages} />
		</>
	);
}
