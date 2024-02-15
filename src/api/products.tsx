import { ProductItemType, ProductResponseItem } from "@/ui/types";

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
