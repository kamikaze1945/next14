"use server";

import { executeGraphQl } from "@/api/graphqlApi";
import { CartChangeItemQuantityDocument } from "@/gql/graphql";

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
