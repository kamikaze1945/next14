import {
	ProductGetByIdDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetListDocument,
} from "@/gql/graphql";
import type {
	ProductItemType,
	ProductResponseItem,
} from "@/types/products";
import { executeGraphql } from "@/api/graphqlApi";

export const getProductsByCategorySlug = async (
	categorySlug: string,
): Promise<ProductItemType[]> => {
	const graphqlResponse = await executeGraphql(
		ProductsGetByCategorySlugDocument,
		{ slug: categorySlug },
	);

	const products = graphqlResponse?.categories[0]?.products || [];

	return products.map((p) => {
		return {
			id: p.id,
			name: p.name,
			description: p.description,
			category: p.categories[0]?.name || "",
			price: p.price,
			coverImage: p.images[0] && {
				src: p.images[0].url,
				alt: p.name,
			},
		};
	});
};

export const getProductList = async (): Promise<
	ProductItemType[]
> => {
	const graphqlResponse = await executeGraphql(
		ProductsGetListDocument,
		{},
	);

	return graphqlResponse.products.map((p) => {
		return {
			id: p.id,
			name: p.name,
			description: p.description,
			category: p.categories[0]?.name || "",
			price: p.price,
			coverImage: p.images[0] && {
				src: p.images[0].url,
				alt: p.name,
			},
		};
	});
};

export const getProductById = async (
	productId: string,
): Promise<ProductItemType> => {
	const graphqlResponse = await executeGraphql(
		ProductGetByIdDocument,
		{ id: productId },
	);

	const product = graphqlResponse?.product;

	if (!product) {
		throw new Error("Product not found");
	}

	return {
		id: product.id,
		name: product.name,
		description: product.description,
		category: product.categories[0]?.name || "",
		price: product.price,
		coverImage: product.images[0] && {
			src: product.images[0].url,
			alt: product.name,
		},
	};
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
