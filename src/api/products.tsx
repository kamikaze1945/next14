import {
	ProductGetByIdDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetListDocument,
} from "@/gql/graphql";
import type {
	ProductItemType,
	ProductResponseItem,
} from "@/types/products";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductList = async () => {
	const graphqlResponse = await executeGraphql(
		ProductsGetListDocument,
		{},
	);
	console.log(graphqlResponse);

	return graphqlResponse?.products?.data || [];
};

export const getProductsByCategorySlug = async (
	categorySlug: string | undefined,
) => {
	let graphqlResponse;
	if (categorySlug) {
		graphqlResponse = await executeGraphql(
			ProductsGetByCategorySlugDocument,
			{ slug: categorySlug },
		);
	}

	const products = graphqlResponse?.category?.products || [];

	return products;
};

export const getProductsByCollectionSlug = async (
	collectionSlug: string,
) => {
	const graphqlResponse = await executeGraphql(
		ProductsGetByCollectionSlugDocument,
		{ slug: collectionSlug },
	);

	const products = graphqlResponse?.collection?.products || [];

	return products;
};

export const getProductById = async (id: string) => {
	const graphqlResponse = await executeGraphql(
		ProductGetByIdDocument,
		{ id: id },
	);

	const product = graphqlResponse?.product;

	if (!product) {
		throw new Error("Product not found");
	}
	return graphqlResponse.product;
};

const productResponseItemToProductItemType = (
	product: ProductResponseItem,
): ProductItemType => {
	return {
		id: product.id,
		name: product.name,
		category: product.category,
		price: product.price,
		description: product.description,
		coverImage: product.image && {
			src: product.image,
			alt: product.name,
		},
	};
};

export const getProductByIdApi = async (
	id: ProductResponseItem["id"],
) => {
	const response = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);

	const productResponse =
		(await response.json()) as ProductResponseItem;
	return productResponseItemToProductItemType(productResponse);
};

export const getPaginationProductList = async (
	take?: number,
	offset?: number,
) => {
	const takeQueryParam = take ? `?take=${take}` : "";
	const offsetQueryParam = offset ? `&offset=${offset}` : "";
	const url = `https://naszsklep-api.vercel.app/api/products${takeQueryParam}${offsetQueryParam}`;

	const response = await fetch(`${url}`);

	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}

	const productsResponse =
		(await response.json()) as ProductResponseItem[];
	const products = productsResponse.map(
		productResponseItemToProductItemType,
	);

	return products;
};

export const getAllPagesByUrl = async (
	href: string,
	take?: number,
) => {
	let pageCounts: number = 0;
	let nextPage = true;
	let totalRecords = 0;

	while (nextPage) {
		const offset = take ? pageCounts * take : 0;
		const takeQueryParam = take ? `?take=${take}` : "";
		const offsetQueryParam = `&offset=${offset}`;
		const url = `${href}${takeQueryParam}${offsetQueryParam}`;

		const response = await fetch(url);
		const productsResponse =
			(await response.json()) as ProductResponseItem[];
		const currentPageRecords = productsResponse.length || 0;

		if (currentPageRecords > 0) {
			totalRecords += currentPageRecords;
			pageCounts++;
		} else {
			nextPage = false;
		}
	}

	return { totalRecords, pageCounts, takePage: take };
};
