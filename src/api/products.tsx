import {
	ProductsGetListDocument,
	type TypedDocumentString,
} from "@/gql/graphql";
import type {
	ProductItemType,
	ProductResponseItem,
} from "@/ui/types";

// type GraphQLResponse<T> =
// 	| { data?: undefined; errors: { message: string }[] }
// 	| { data: T; errors?: undefined };

const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL) {
		throw new Error("GRAPHQL_URL is not defined");
	}

	const response = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	type GraphQLResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const graphqlResponse =
		(await response.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		throw new TypeError(`Graph Error`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
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
			title: p.name,
			category: p.categories[0]?.name || "",
			price: p.price,
			description: p.description,
			coverImage: p.images[0] && {
				src: p.images[0].url,
				alt: p.name,
			},
		};
	});
};

export const getProductById = async (
	id: ProductResponseItem["id"],
) => {
	const response = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);

	const productResponse =
		(await response.json()) as ProductResponseItem;
	return productResponseItemToProductItemType(productResponse);
};

const productResponseItemToProductItemType = (
	product: ProductResponseItem,
): ProductItemType => {
	return {
		id: product.id,
		title: product.title,
		category: product.category,
		price: product.price,
		description: product.description,
		coverImage: {
			src: product.image,
			alt: product.title,
		},
	};
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
