"use client";

import clsx from "clsx";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const ActiveLink = <T extends string>({
	href,
	children,
	exact = false,
	partialMatch = false,
	className = "text-blue-400 hover:text-blue-600",
	activeClassName = "underline",
	title,
}: {
	href: Route<T> | URL;
	children: ReactNode;
	exact?: boolean;
	partialMatch?: boolean;
	className?: string;
	activeClassName?: string;
	title?: string;
}) => {
	const pathname = usePathname();

	const isActive = partialMatch
		? pathname.startsWith(href.toString())
		: exact
			? pathname === href
			: pathname.includes(href.toString());

	//todo: delete console.log
	if (isActive) {
		console.log("pathname", pathname);
		console.log("href", href);
	}

	return (
		<Link
			href={href}
			aria-current={isActive ? "page" : undefined}
			className={clsx(className, {
				[activeClassName]: isActive,
			})}
			title={title ?? title}
			passHref
		>
			{children}
		</Link>
	);
};
