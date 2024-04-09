import { executeGraphQl } from "@/api/graphqlApi";
import { OrdersGetByEmailDocument } from "@/gql/graphql";
import { revalidateTag } from "next/cache";

export const getOrdersByEmail = async (email: string) => {
	const graphqlResponse = await executeGraphQl({
		query: OrdersGetByEmailDocument,
		variables: {
			email: email,
		},
		next: {
			tags: ["orders"],
			revalidate: 60 * 60 * 24,
		},
	});

	console.log(graphqlResponse);
	return graphqlResponse;
};
