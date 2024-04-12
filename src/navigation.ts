import {
	Pathnames,
	createSharedPathnamesNavigation,
} from "next-intl/navigation";

export const locales = ["en", "pl"] as const;
export const defaultLocale = "pl" as const;
export const localePrefix = "always";
export const pathnames = {
	"/sign-in": {
		en: "/sign-in",
		pl: "/zaloguj-sie",
	},
	"/contact": {
		en: "/contact",
		pl: "/kontakt",
	},
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({
		locales,
		localePrefix,
	});
