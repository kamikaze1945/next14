import { type Metadata } from "next";
import { notFound } from "next/navigation";
import {
	//	getAllPagesByUrl,
	//	getPaginationProductList,
	getProductList,
} from "@/api/products";
//import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

export const metadata: Metadata = {
	title: "All products",
	description: "Products list - you can find here all products.",
};

type ProductPageProps = {
	params: {
		page?: string[];
	};
};

// export async function generateStaticParams() {
// 	const products = await getPaginationProductList();
// 	const totalPages = Math.ceil(products.length / 20);
// 	const countGeneratePage = totalPages > 5 ? 5 : totalPages;
// 	const paths = Array.from(
// 		{ length: countGeneratePage },
// 		(_, i) => i + 1,
// 	).map((page) => ({
// 		params: { page: [String(page)] },
// 	}));
// 	return paths;
// }

export default async function ProductsPage(
	{
		//params,
	}: ProductPageProps,
) {
	// const offset = params.page ? Number(params.page[0]) * 20 - 20 : 0;
	// const products = await getPaginationProductList(20, offset);

	// const pageNumber = params.page ? Number(params.page[0]) : 0;

	// const productDataCount = await getAllPagesByUrl(
	// 	"https://naszsklep-api.vercel.app/api/products",
	// 	4000,
	// );
	// const totalPages = Math.ceil(productDataCount?.totalRecords / 20);

	const products = await getProductList();

	if (!products) {
		throw notFound();
	}

	return (
		<>
			<ProductList products={products || []} />
			{/* <Pagination pageNumber={pageNumber} totalPages={totalPages} /> */}
		</>
	);
}
