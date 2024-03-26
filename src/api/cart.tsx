"use server";

import { cookies } from "next/headers";
import { executeGraphQl } from "@/api/graphqlApi";
import {
	CardCreateDocument,
	CartAddProductDocument,
	CartChangeItemQuantityDocument,
	CartGetByIdDocument,
	CartItemInput,
	ProductGetByIdDocument,
} from "@/gql/graphql";
import { revalidateTag } from "next/cache";

export async function getOrCreateCart(productId: string) {
	const cart = await getCartIdFromCookies();
	if (!cart?.id) {
		const cardData = await createCart("", {
			productId: productId,
			quantity: 1,
		});
		if (cardData?.cartFindOrCreate === null) {
			throw new Error("Error create new Cart order");
		}
	}

	if (cart?.id) {
		await addToCart(cart?.id, productId);
	}
	revalidateTag("cart");

	return cart;
}

export async function getCartIdFromCookies() {
	const cartId = cookies().get("cartId")?.value || "";

	if (cartId) {
		const cartData = await executeGraphQl({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			cache: "no-store",
			next: {
				tags: ["cart"],
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
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});
}

export async function createCart(
	cartId: string,
	//input: CartItemInput,
	input: CartItemInput,
) {
	const resultData = await executeGraphQl({
		query: CardCreateDocument,
		variables: {
			id: cartId,
			input: input || null,
		},
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	if (resultData === undefined) {
		throw new Error("Error create new Cart order");
	}

	cartId = resultData.cartFindOrCreate.id;
	cookies().set("cartId", cartId, {
		httpOnly: true,
		sameSite: "lax",
		secure: true, // only work on production
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
		cache: "no-store",
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
					cache: "no-store",
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
		cache: "no-store",
		next: {
			tags: ["cart"],
		},
	});

	return true;
}
