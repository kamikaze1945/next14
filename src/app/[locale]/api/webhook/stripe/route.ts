import { NextRequest } from "next/server";
import Stripe from "stripe";
/// <reference types="stripe-event-type" />

export async function POST(request: NextRequest): Promise<Response> {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Stripe public key is not set");
	}

	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		throw new Error("Stripe public key is not set");
	}

	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
		typescript: true,
	});

	const signature = request.headers.get("stripe-signature");
	if (!signature) {
		throw new Response("Stripe signature is not set", {
			status: 401,
		});
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		process.env.STRIPE_WEBHOOK_SECRET,
	) as Stripe.Event;

	switch (event.type) {
		case "payment_intent.created": {
		}
		case "checkout.session.completed": {
			event.data.object as Stripe.Checkout.Session;
			event.data.object.metadata?.cartId;
			const session = event.data.object as Stripe.Checkout.Session;
			break;
		}
		case "checkout.session.expired": {
			event.data.object as Stripe.Checkout.Session;
			const session = event.data.object as Stripe.Checkout.Session;
			break;
		}
		case "checkout.session.async_payment_failed": {
			event.data.object as Stripe.Checkout.Session;
			const session = event.data.object as Stripe.Checkout.Session;
			break;
		}
		case "checkout.session.async_payment_succeeded": {
			event.data.object as Stripe.Checkout.Session;
			const session = event.data.object as Stripe.Checkout.Session;
			break;
		}
	}

	const body = await request.json();

	return new Response("OK", { status: 204 });
}
