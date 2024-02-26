import { type Route } from "next";
import { type AppRoute } from "@/types/routes";

export const routes: AppRoute[] = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "/products" as Route,
		label: "All",
	},
	{
		href: "/products/t-shirts" as Route,
		label: "T-shirts",
	},
	{
		href: "/products/hoodies" as Route,
		label: "Hoodies",
	},
	{
		href: "/products/accessories" as Route,
		label: "Accessories",
	},
	{
		href: "/collections/summer-vibes" as Route,
		label: "Collections",
	},
];
