import { redirect } from "@/navigation";

export default async function CartCancelPage({
	searchParams,
}: {
	searchParams: { sessionId: string };
}) {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe public key is not set");
	}

	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(
		searchParams.sessionId,
	);

	return (
		<div>
			<h1>Payment Success</h1>
			<p>Payment ID: {session.payment_status}</p>
		</div>
	);
}
