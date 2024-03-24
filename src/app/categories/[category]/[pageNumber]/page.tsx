import { notFound } from "next/navigation";
import { type Metadata, Route } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsByCategorySlug } from "@/api/products";
import { Suspense } from "react";
import { Pagination } from "@/ui/molecules/Pagination";
import { PageTitle } from "@/ui/atoms/PageTitle";

export const dynamic = "force-dynamic";

type CategoryProductPageProps = {
	params: {
		category: string;
		pageNumber?: number;
	};
};

export const generateMetadata = async ({
	params,
}: CategoryProductPageProps): Promise<Metadata> => {
	const products = await getProductsByCategorySlug(params.category);

	let productName = "Category best product";
	let productDescription = "Get category best product now!";

	if (products && products.length > 0) {
		productName = products[0].name;
		productDescription = products[0].description;
	}

	return {
		title: `${products[0]?.categories[0]?.name}`,
		description: `${productDescription}`,
	};
};

export const generateStaticParams = async ({
	params,
}: {
	params: { category: string; page: string };
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

	console.log("categoryyyyy  page number browser: ", params);
	console.log("categoryyyyy all products: ", products);
	if (!products) {
		throw notFound();
	}

	const currentPage = params?.pageNumber || 1;
	console.log("currentPage", currentPage);
	const take = 4;
	const offset = (currentPage - 1) * take;
	const totalPages = Math.ceil(products.length / take);
	const productsCountOnPage = products.slice(
		offset,
		currentPage * take,
	);

	if (currentPage == 1) {
		console.log(productsCountOnPage);
		console.log(offset, currentPage * take);
		console.log("1111categoryyyyy  page number browser: ", params);
	} else {
		console.log(productsCountOnPage);
		console.log(offset, currentPage * take);
		console.log("2222categoryyyyy  page number browser: ", params);
	}

	const pageTitle =
		`Category - ${products[0]?.categories[0]?.name}` || `Category`;

	return (
		<>
			<Suspense aria-busy="true">
				<PageTitle param={pageTitle} />
				<ProductList products={productsCountOnPage || []} />
				<Pagination
					href={`/categories/${params.category}` as Route}
					pageNumber={currentPage}
					totalPages={totalPages || 0}
				/>
			</Suspense>
		</>
	);
}
