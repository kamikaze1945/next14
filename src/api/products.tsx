import {
	ProductGetByIdDocument,
	ProductSortBy,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetByPageDocument,
	ProductsGetListDocument,
	ProductsGetSearchByTermDocument,
	ReviewCreateDocument,
	SortDirection,
} from "@/gql/graphql";
import type {
	ProductItemType,
	ProductResponseItem,
	ReviewType,
} from "@/types/products";
import { executeGraphQl } from "@/api/graphqlApi";
import { revalidateTag } from "next/cache";

export const createReview = async (
	productId: string,
	formData: FormData,
) => {
	console.log("formData", formData);

	const reviewData = Object.fromEntries(
		formData,
	) as unknown as ReviewType;
	const response = executeGraphQl({
		query: ReviewCreateDocument,
		variables: {
			author: reviewData.name,
			title: reviewData.headline,
			description: reviewData.content,
			email: reviewData.email,
			productId: productId.toString(),
			rating: Number(reviewData.rating),
		},
	});
	//revalidateTag("reviews");
	return response;
};

export const getProductsByPage = async (
	take: number,
	skip: number,
	order?: SortDirection,
	orderBy?: ProductSortBy,
) => {
	const graphqlResponse = await executeGraphQl({
		query: ProductsGetByPageDocument,
		variables: {
			take: take || 10,
			skip: skip || 0,
			order: order,
			orderBy: orderBy,
		},
		next: {
			tags: ["products"],
			revalidate: 60 * 60 * 24,
		},
	});

	return {
		data: graphqlResponse?.products?.data || [],
		meta: graphqlResponse?.products?.meta,
	};
};

export const searchPoductsByTerm = async (searchTearm: string) => {
	let graphqlResponse;
	if (searchTearm) {
		graphqlResponse = await executeGraphQl({
			query: ProductsGetSearchByTermDocument,
			variables: {
				searchTearm: searchTearm,
			},
		});
	}
	return graphqlResponse?.products?.data || [];
};

export const getProductsByCategorySlug = async (
	categorySlug: string,
) => {
	let graphqlResponse;
	if (categorySlug) {
		graphqlResponse = await executeGraphQl({
			query: ProductsGetByCategorySlugDocument,
			variables: {
				slug: categorySlug,
			},
		});
	}

	const products = graphqlResponse?.category?.products || [];

	return products;
};

export const getProductsByCollectionSlug = async (
	collectionSlug: string,
) => {
	const graphqlResponse = await executeGraphQl({
		query: ProductsGetByCollectionSlugDocument,
		variables: {
			slug: collectionSlug,
		},
	});

	const products = graphqlResponse?.collection?.products || [];

	return products;
};

export const getProductById = async (id: string) => {
	const graphqlResponse = await executeGraphQl({
		query: ProductGetByIdDocument,
		variables: {
			id: id,
		},
		next: {
			revalidate: 1,
		},
	});

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

export const getAllPagesByUrl2 = async (
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
