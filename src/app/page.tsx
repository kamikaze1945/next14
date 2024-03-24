import { getProductsByPage } from "@/api/products";
import { PageTitle } from "@/ui/atoms/PageTitle";
import { ProductList } from "@/ui/organisms/ProductList";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Top products",
	description: "Products list - you can find here all products.",
};

type ProductPageProps = {
	params: {
		page?: number;
	};
};

export const generateStaticParams = async () => {
	const products = await getProductsByPage(3, 0);
	return products?.data?.map((product) => ({
		params: { productId: product.id },
	}));
};

export default async function Home({ params }: ProductPageProps) {
	const currentPage = params?.page || 1;
	const take = 4;
	const offset = (currentPage - 1) * take || 3;
	const products = await getProductsByPage(take, offset);

	if (!products) {
		throw notFound();
	}
	const pageTitle = `Top products`;

	return (
		<>
			<Suspense>
				<PageTitle param={pageTitle} />
				<ProductList products={products?.data || []} />
			</Suspense>
		</>
	);
}
