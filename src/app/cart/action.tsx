"use server";

import { executeGraphql } from "@/api/graphqlApi";
import { CartChangeItemQuantityDocument } from "@/gql/graphql";

export const changeProductQuantity = (
	cartId: string,
	productId: string,
	quantity: number,
) => {
	return executeGraphql(CartChangeItemQuantityDocument, {
		id: cartId,
		productId: productId,
		quantity: quantity,
	});
};
