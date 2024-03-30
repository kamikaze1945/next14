import { redirect } from "next/navigation";

export default async function CartSuccessPage({
	searchParams,
}: {
	searchParams?: { sessionId: string };
}) {
	if (!searchParams?.sessionId) {
		throw new Error("Session ID is not set");
		//redirect("/cart");
	}
	// if (!process.env.STRIPE_SECRET_KEY) {
	// 	throw new Error("Stripe public key is not set");
	// }

	// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
	// 	typescript: true,
	// });

	// const checkoutSession = await stripe.checkout.sessions.retrieve(
	// 	searchParams?.sessionId,
	// );

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe public key is not set");
	}

	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.retrieve(
		searchParams?.sessionId,
	);

	return (
		<div>
			<h1>Payment Success</h1>
			{/* <p>Payment ID: {checkoutSession.payment_intent}</p> */}
		</div>
	);
}
