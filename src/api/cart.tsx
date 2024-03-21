"use server";

import { cookies } from "next/headers";
import { executeGraphQl } from "@/api/graphqlApi";
import {
	CardCreateDocument,
	CartAddProductDocument,
	CartChangeItemQuantityDocument,
	CartGetByIdDocument,
	ProductGetByIdDocument,
} from "@/gql/graphql";

export async function getOrCreateCart(productId: string) {
	const cart = await getCartIdFromCookies();
	if (cart) {
		return cart;
	}

	const cardData = await createCart("", productId, 1);
	if (cardData?.cartFindOrCreate === null) {
		throw new Error("Error create new Cart order");
	}

	return cardData.cartFindOrCreate;
}

export async function getCartIdFromCookies() {
	const cartId = cookies().get("cartId")?.value || "";

	if (cartId) {
		const cartData = await executeGraphQl({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
		});

		if (cartData !== undefined && cartData?.cart?.id !== null) {
			return cartData?.cart;
		}
	}
}

export async function getCardById(cartId: string) {
	return await executeGraphQl({
		query: CartGetByIdDocument,
		variables: {
			id: cartId,
		},
	});
}

export async function createCart(
	cartId: string,
	productId: string,
	quantity: number = 1,
) {
	const resultData = await executeGraphQl({
		query: CardCreateDocument,
		variables: {
			id: cartId,
			productId: productId,
			quantity: quantity,
		},
		next: {
			tags: ["cart"],
		},
	});

	console.log(
		"createCart:resultData: ",
		resultData.cartFindOrCreate.id,
	);
	if (resultData === undefined) {
		throw new Error("Error create new Cart order");
	}
	cartId = resultData.cartFindOrCreate.id;
	cookies().set("cartId", cartId, {
		httpOnly: true,
		sameSite: "lax",
		//secure: true, // only work on production
	});
	return resultData;
}

export async function addToCart(
	cartId: string,
	productId: string,
	quantity: number = 1,
) {
	const { product } = await executeGraphQl({
		query: ProductGetByIdDocument,
		variables: {
			id: productId,
		},
		next: {
			tags: ["cart"],
		},
	});

	if (!product) {
		throw new Error("Product not found");
	}

	const cardData = await getCardById(cartId);

	if (
		cardData !== undefined &&
		cardData?.cart?.id !== null &&
		cardData?.cart?.items &&
		cardData?.cart?.items.length > 0
	) {
		const cart = cardData.cart;

		for (const item of cart.items) {
			if (item.product.id === productId) {
				quantity = item.quantity + 1;
				console.log(
					`Product IDssssss: ${item.product.id}, Name: ${item.product.name}, Quantity: ${item.quantity} , item.quantity ${item.quantity}  Quantity: ${quantity}`,
				);
				await executeGraphQl({
					query: CartChangeItemQuantityDocument,
					variables: {
						id: cartId,
						productId: productId,
						quantity: quantity,
					},
					next: {
						tags: ["cart"],
					},
				});

				return true;
			}
		}
	}

	await executeGraphQl({
		query: CartAddProductDocument,
		variables: {
			id: cartId,
			productId: productId,
			quantity: quantity,
		},
		next: {
			tags: ["cart"],
		},
	});

	return true;
}
