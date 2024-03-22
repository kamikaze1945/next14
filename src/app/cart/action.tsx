"use server";

import { executeGraphQl } from "@/api/graphqlApi";
import {
	CartChangeItemQuantityDocument,
	CartRemoveProductDocument,
} from "@/gql/graphql";

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
	return executeGraphQl({
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
};
