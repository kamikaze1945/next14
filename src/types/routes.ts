import { type Route } from "next";

type RouteLabel =
	| "Home"
	| "All"
	| "T-shirts"
	| "Hoodies"
	| "Accessories"
	| "Collections";

export type AppRoute = {
	href: Route;
	label?: RouteLabel;
	alt?: string;
};
