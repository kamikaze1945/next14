import { Route, type Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByPage } from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { Suspense } from "react";
import { PageTitle } from "@/ui/atoms/PageTitle";
import { ProductSortSelect } from "@/ui/atoms/ProductSortSelect";
import { ProductSortBy, SortDirection } from "@/gql/graphql";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "All products",
	description: "Products list - you can find here all products.",
};

type ProductPageProps = {
	params: {
		page?: number;
	};
	searchParams: { [key: string]: string | string[] };
};

export const generateStaticParams = async () => {
	const products = await getProductsByPage(10, 0);
	return products?.data?.map((product) => ({
		params: { productId: product.id },
	}));
};

export default async function ProductsPage({
	params,
	searchParams,
}: ProductPageProps) {
	const currentPage = params?.page || 1;
	const take = 10;
	const offset = (currentPage - 1) * take || 0;

	const order = searchParams.order
		? ((typeof searchParams.order === "string"
				? searchParams.order.toUpperCase()
				: searchParams.order[0].toUpperCase()) as SortDirection)
		: "ASC";

	const orderBy = searchParams.orderBy
		? ((typeof searchParams.orderBy === "string"
				? searchParams.orderBy.toUpperCase()
				: searchParams.orderBy[0].toUpperCase()) as ProductSortBy)
		: "DEFAULT";

	const products = await getProductsByPage(
		take,
		offset,
		order,
		orderBy,
	);

	if (!products) {
		throw notFound();
	}
	const pageTitle = `All products`;

	return (
		<>
			<Suspense>
				<PageTitle param={pageTitle} />
				<ProductSortSelect />
				<ProductList products={products?.data || []} />
				<Pagination
					href={`/products` as Route}
					pageNumber={currentPage}
					totalPages={Math.ceil(products?.meta?.total / take) || 0}
				/>
			</Suspense>
		</>
	);
}
