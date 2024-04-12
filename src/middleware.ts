import {
	locales,
	defaultLocale,
	pathnames,
	localePrefix,
} from "@/navigation";
import { authMiddleware } from "@clerk/nextjs";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
	locales,
	defaultLocale,
	pathnames,
	localePrefix,
});

export default authMiddleware({
	beforeAuth(req) {
		return intlMiddleware(req);
	},
	publicRoutes: [
		"/",
		"/:locale",
		"/search",
		"/:locale/search",
		"/cart",
		"/:locale/cart",
		"/categories/(.*)",
		"/:locale/categories/(.*)",
		"/collections/(.*)",
		"/:locale/collections/(.*)",
		"/product/(.*)",
		"/:locale/product/(.*)",
		"/products",
		"/:locale/products",
		"/contact",
		"/:locale/contact",
	],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
