import { type Route } from "next";
import { type AppRoute } from "@/types/routes";

export const routes: AppRoute[] = [
	{
		href: "/" as Route,
		label: "Home",
	},
	{
		href: "/products" as Route,
		label: "All",
	},
	{
		href: "/products/hoodies" as Route,
		label: "Hoodies",
	},
	{
		href: "/collections/summer-vibes" as Route,
		label: "Collections",
	},
	{
		href: "/categories/t-shirts/1" as Route,
		label: "T-shirts",
	},
	{
		href: "/categories/accessories/1" as Route,
		label: "Accessories",
	},
];
