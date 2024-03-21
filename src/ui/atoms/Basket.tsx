"use server";
import { getCartIdFromCookies } from "@/api/cart";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

export async function Basket() {
	const cart = await getCartIdFromCookies();
	const quantity =
		cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

	return (
		<div>
			<ShoppingCart />
			<span className="ml-1 ">{quantity}</span>
		</div>
	);
}
