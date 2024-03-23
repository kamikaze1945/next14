"use server";

import { getCartIdFromCookies } from "@/api/cart";
import { executeGraphQl } from "@/api/graphqlApi";
import {
	CartChangeItemQuantityDocument,
	CartRemoveProductDocument,
} from "@/gql/graphql";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Stripe from "stripe";
import { revalidateTag } from "next/cache";

export const removeItemProduct = (
	cartId: string,
	productId: string,
) => {
	return executeGraphQl({
		query: CartRemoveProductDocument,
		variables: {
			id: cartId,
			productId: productId,
		},
		next: {
			tags: ["cart"],
		},
	});
};

export const changeProductQuantity = (
	cartId: string,
	productId: string,
	quantity: number,
) => {
	const response = executeGraphQl({
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

	revalidateTag("cart");
	return response;
};

export async function handlePaymentAction() {
	"use server";

	const cart = await getCartIdFromCookies();
	if (!cart) {
		return;
	}
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe public key is not set");
	}

	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "blik", "p24"],
		metadata: {
			cartId: cart.id,
		},
		//todo: check product exist
		line_items: cart.items.map((item) => ({
			price_data: {
				currency: "pln",
				product_data: {
					name: item.product.name || "",
				},
				unit_amount: item.product?.price * 100 || 0,
			},
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url:
			"http://localhost:3000/cart/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url:
			"http://localhost:3000/cart/cancel?sessionId={CHECKOUT_SESSION_ID}",
	});

	if (!checkoutSession.url) {
		throw new Error("Error create new checkout order");
	}

	cookies().set("cartId", "");
	redirect(checkoutSession.url);
}
