"use client";

import clsx from "clsx";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const ActiveLink = ({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	console.log("pathname", pathname);
	console.log("href", href);
	return (
		<Link
			href={{pathname: href}} // Update the href prop to be of type UrlObject
			className={clsx(` text-blue-400 hover:text-blue-600`, {
				underline: isActive,
			})}
		>
			{children}
		</Link>
	);
};
