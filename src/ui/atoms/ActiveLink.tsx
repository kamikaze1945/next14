"use client";

import clsx from "clsx";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type ActiveLinkProps<T extends string> = {
	href: Route<T>;
	children: ReactNode;
	exact?: boolean;
	title?: string;
	className?: string;
	activeClassName?: string;
};

export const ActiveLink = <T extends string>({
	href,
	children,
	title,
	exact = false,
	className = "text-blue-400 hover:text-blue-600",
	activeClassName = "underline",
}: ActiveLinkProps<T>) => {
	const pathname = usePathname();
	const isActive = exact
		? pathname === href
		: pathname.startsWith(href as string);

	return (
		<Link
			href={href}
			aria-current={isActive ? "page" : undefined}
			className={clsx(className, {
				[activeClassName]: isActive,
			})}
			title={title}
			passHref
		>
			{children}
		</Link>
	);
};
