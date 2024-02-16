import { ProductItemType, ProductResponseItem } from "@/ui/types";
import { url } from "inspector";

//todo: dodać obsługę
//const apiUrl = process.env.API_URL;

export const getProductList = async () => {
	const res = await fetch(
		"https://naszsklep-api.vercel.app/api/products",
	);

	const productsResponse =
		(await res.json()) as ProductResponseItem[];
	const products = productsResponse.map(
		productResponseItemToProductItemType,
	);

	return products;
};

export const getProductById = async (
	id: ProductResponseItem["id"],
) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);

	const productResponse = (await res.json()) as ProductResponseItem;
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
		longDescription: product.longDescription,
		coverImage: {
			src: product.image,
			alt: product.title,
		},
		rating: {
			rate: product.rating?.rate,
			count: product.rating?.count,
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

	console.log("getPaginationProductList url:", url);
	const res = await fetch(`${url}`);

	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}

	const productsResponse =
		(await res.json()) as ProductResponseItem[];
	const products = productsResponse.map(
		productResponseItemToProductItemType,
	);

	return products;
};

export const getAllPagesByUrl = async (
	href: string,
	take?: number,
	offset2?: number,
) => {
	let pageCounts: number = 0;
	let nextPage = true;
	let totalRecords = 0;
	let responseData: ProductResponseItem[] = [];

	while (nextPage) {
		const offset = take ? pageCounts * take : 0;
		const takeQueryParam = take ? `?take=${take}` : "";
		const offsetQueryParam = `&offset=${offset}`;
		const url = `${href}${takeQueryParam}${offsetQueryParam}`;

		const response = await fetch(url);
		const jsonData = await response.json();
		const currentPageRecords = jsonData.length || 0;
		console.log(jsonData);

		console.log(
			"API getAllPagesByUrl currentPageRecords:",
			url,
			currentPageRecords,
		);

		if (currentPageRecords > 0) {
			//if (currentPageRecords > 0) {
			//responseData = responseData.concat(jsonData);
			totalRecords += currentPageRecords;
			pageCounts++;
		} else {
			nextPage = false;
		}
	}

	return { totalRecords, pageCounts, takePage: take };
};
